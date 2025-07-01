import ProFormIconSelect from '@/components/IconSelect';
import { menuCreateMenu, menuDeleteMenu, menuGetMenu, menuListMenu, menuUpdateMenu } from '@/services/console/menu';
import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProCard,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormSegmented,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { useModel, useRequest } from '@umijs/max';
import {
  App,
  Button,
  Collapse,
  ConfigProvider,
  Popconfirm,
  Spin,
  Switch,
  Tree,
  type TreeNodeProps,
  type TreeSelectProps,
} from 'antd';
import { useMemo, useRef, useState } from 'react';
import { FontIcon, NodeTitle } from './NodeTitle';

// 构建菜单树映射
const toTreeMap = (dataSource?: API.MenuInfo[]): Record<string, API.MenuInfo[]> => {
  if (!dataSource) return {};

  return dataSource.reduce<Record<string, API.MenuInfo[]>>((treeMap, item) => {
    const pid = item.pid || '0';
    return {
      ...treeMap,
      [pid]: [...(treeMap[pid] || []), item],
    };
  }, {});
};

// 构建 TreeData
const mapTreeData = (dataSource?: API.MenuInfo[]): TreeSelectProps['treeData'] => {
  if (!dataSource) return [];

  // 先构建一个父ID到子节点的映射
  const mapping = dataSource.reduce<Record<string, API.MenuInfo[]>>((previous, item) => {
    const pid = item.pid || '0';
    if (!previous[pid]) {
      previous[pid] = [];
    }
    previous[pid].push(item);
    return previous;
  }, {});

  // 递归构建树
  const toTreeData = (parentId: string = '0'): TreeSelectProps['treeData'] => {
    const children = mapping[parentId] || [];
    return children.map((node) => ({
      value: node.id!,
      title: node.name!,
      children: toTreeData(node.id!),
    }));
  };

  return toTreeData();
};

// 递归构建菜单树
const collectTreeNodes = (dataSource: API.MenuInfo[], parentId: string = '0'): TreeNodeProps[] => {
  return dataSource
    .filter((menu) => menu.pid === parentId)
    .map((menu) => {
      const children = collectTreeNodes(dataSource, menu.id);
      if (children.length > 0) {
        return {
          key: menu.id as string,
          title: <NodeTitle title={menu.name!} icon={menu.icon!} />,
          children,
        } as TreeNodeProps;
      }

      return {
        key: menu.id as string,
        title: <NodeTitle title={menu.name!} icon={menu.icon!} />,
        children: [],
      } as TreeNodeProps;
    });
};

// 菜单树视图显示
const TableTree: React.FC<{
  dataSource?: API.MenuInfo[];
  selectedKeys: string[];
  expandedKeys: string[];
  onSelect: (keyPath: string[]) => void;
  onExpand: (keys: string[]) => void;
}> = ({ dataSource, selectedKeys, expandedKeys, onSelect, onExpand }) => {
  const [loading, setLoading] = useState(true);

  const treeNodes = useMemo(() => {
    setLoading(true);
    // 创建根菜单项
    const rootNode: TreeNodeProps = {
      key: 'root',
      title: <NodeTitle title="系统菜单" icon="icon-dashboard" />,
      children: [],
    };

    if (dataSource && dataSource.length > 0) {
      // 构建树形菜单并作为根菜单的子菜单
      rootNode.children = collectTreeNodes(dataSource) as any;
    }

    setLoading(false);
    return [rootNode];
  }, [dataSource]);

  return (
    <Spin spinning={loading}>
      <ProCard style={{ paddingBlock: 0 }} bodyStyle={{ paddingRight: 0 }}>
        <div style={{ height: '64px', lineHeight: '64px' }}>
          <span style={{ fontSize: 16 }}>菜单管理</span>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Tree: {
                titleHeight: 32,
                indentSize: 12,
              },
            },
          }}
        >
          <Tree
            style={{ width: 220, minHeight: '500px' }}
            treeData={treeNodes as any}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onSelect={(keys) => onSelect(keys as string[])}
            onExpand={(keys) => onExpand(keys as string[])}
            blockNode
          />
        </ConfigProvider>
      </ProCard>
    </Spin>
  );
};

const MenuPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<API.MenuInfo>({});
  const [selectedMenuId, setSelectedMenuId] = useState<string>('0'); // 默认为根菜单ID '0'
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['root']);
  const { permissionMap } = useModel('global');

  // 组装菜单列表和树
  const { data: menuList } = useRequest<{ data: API.MenuInfo[] }>(async () => {
    const { data = [] } = await menuListMenu({
      'pagination.page': 1,
      'pagination.page_size': 1000, // 获取所有菜单
    });
    return {
      data,
    };
  });

  const menuTreeMap = useMemo(() => toTreeMap(menuList as API.MenuInfo[]), [menuList]);

  const treeData = useMemo(() => [{ label: '根菜单', value: '0' }, ...(mapTreeData(menuList) || [])], [menuList]);

  const currentMenuList = useMemo(() => menuTreeMap[selectedMenuId] || [], [selectedMenuId, menuTreeMap]);

  // 处理菜单选择
  const handleSelect = (keyPath: string[]) => {
    // 如果选择了 root 菜单，将 selectedMenuId 设置为 '0'，否则使用实际选中的菜单ID
    const currId = keyPath[0];
    setSelectedMenuId(currId === 'root' ? '0' : currId);
    setSelectedKeys(keyPath);
  };

  const handleExpand = (keys: string[]) => {
    setExpandedKeys(keys);
  };

  // 表格渲染函数
  // TableContent 组件，接收选择菜单的处理函数
  const tableRender = (_: any, dom: any) => (
    <div style={{ display: 'flex', width: '100%' }}>
      <TableTree
        dataSource={menuList as any}
        onSelect={handleSelect}
        onExpand={handleExpand}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
      />
      <div style={{ flex: 1 }}>{dom}</div>
    </div>
  );

  // 删除菜单
  const handleDeleteMenu = async (id: string) => {
    try {
      await menuDeleteMenu({ id });
      message.success('删除成功');
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: ProColumns<API.MenuInfo>[] = [
    {
      title: '排序',
      dataIndex: 'sort_by',
      width: 80,
      sorter: true,
    },
    {
      title: '图标',
      dataIndex: 'icon',
      width: 60,
      render: (_, record) => <FontIcon type={record.icon!} />,
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '路径',
      dataIndex: 'path',
    },
    {
      title: '隐藏',
      dataIndex: 'hidden',
      width: 80,
      render: (_, record) => <Switch size="small" checked={record.hidden} disabled />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      valueEnum: {
        0: { text: '启用', status: 'Success' },
        1: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setVisible(true);
            setFormData(record);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定要删除这个菜单吗?"
          onConfirm={() => handleDeleteMenu(record.id!)}
          okText="是"
          cancelText="否"
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.MenuInfo>
        tableStyle={{
          minHeight: '500px',
        }}
        actionRef={actionRef}
        rowKey="id"
        search={false}
        size="small"
        request={async () => {
          const { data = [] } = await menuListMenu({
            'pagination.page': 1,
            'pagination.page_size': 1000, // 获取所有菜单
          });
          return {
            data,
            success: true,
          };
        }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setVisible(true);
              setFormData({
                icon: 'icon-earth',
                sort_by: '1',
                status: 0,
                pid: selectedMenuId,
              });
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        columns={columns}
        dataSource={currentMenuList}
        tableRender={tableRender}
      />

      <ModalForm
        title={formData.id === undefined ? '新建菜单' : '编辑菜单'}
        open={visible}
        onOpenChange={setVisible}
        params={formData}
        request={async (params) => {
          if (params.id) {
            const { data } = await menuGetMenu({ id: params.id });
            return data;
          }

          return {
            ...params,
          };
        }}
        onFinish={async (values = {}) => {
          console.log('values', values);

          try {
            if (values.id) {
              await menuUpdateMenu({ id: values.id }, values);
            } else {
              await menuCreateMenu(values);
            }
            message.success('操作成功');
            // 关闭模态框
            setVisible(false);
            // 重新获取菜单列表
            if (actionRef.current) {
              actionRef.current.reload();
            }
            return true;
          } catch (error) {
            console.error(error);
            message.error('操作失败' + error);
            return false;
          }
        }}
        grid={true}
        layout="vertical"
      >
        <ProFormText name="id" hidden />
        <ProFormGroup>
          <ProFormTreeSelect name="pid" label="父级菜单名称" request={async () => treeData} colProps={{ span: 18 }} />
          <ProFormSelect
            name="permission_id"
            label="授权"
            options={[{ name: '-', alias: '任意', id: '0' }, ...Object.values(permissionMap)].map((item) => ({
              label: `${item.alias}(${item.name})`,
              value: item.id,
            }))}
            colProps={{ span: 6 }}
          />
        </ProFormGroup>
        <ProFormText
          name="path"
          label="路径"
          placeholder="请输入菜单路径"
          rules={[{ required: true, message: '请输入菜单路径' }]}
        />
        <ProFormGroup>
          <ProFormIconSelect name="icon" label="图标" placeholder="请选择图标名称" colProps={{ span: 2 }} />
          <ProFormText
            name="name"
            label="菜单名称"
            placeholder="请输入菜单名称"
            rules={[{ required: true, message: '请输入菜单名称' }]}
            colProps={{ span: 22 }}
          />
        </ProFormGroup>

        <Collapse
          style={{ width: '100%' }}
          bordered={false}
          defaultActiveKey={[]}
          items={[
            {
              key: '0',
              label: '附加选项',
              forceRender: true,
              children: (
                <ProFormGroup>
                  <ProFormDigit
                    name="sort_by"
                    label="排序"
                    placeholder="请输入排序值"
                    colProps={{ span: 6 }}
                    rules={[{ required: true, message: '请输入排序值' }]}
                  />
                  <ProFormSegmented
                    name="hidden"
                    label="不在菜单显示"
                    valueEnum={{ 0: '显示', 1: '隐藏' }}
                    colProps={{ span: 6 }}
                  />
                  <ProFormRadio.Group
                    name="status"
                    label="状态"
                    valueEnum={{ 0: '显示', 1: '隐藏' }}
                    colProps={{ span: 6 }}
                  />
                </ProFormGroup>
              ),
            },
          ]}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default MenuPage;

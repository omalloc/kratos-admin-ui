import ProFormIconSelect from '@/components/IconSelect';
import useRoleList from '@/models/global';
import { menuCreateMenu, menuDeleteMenu, menuListMenu, menuUpdateMenu } from '@/services/console/menu';
import { createFromIconfontCN, EditOutlined, PlusOutlined } from '@ant-design/icons';
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
import { useRequest } from '@umijs/max';
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

const FontIcon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
});

// 菜单项类型
interface MenuTreeItem {
  key: string;
  title: string | JSX.Element;
  icon?: string | JSX.Element;
  children?: MenuTreeItem[];
}

const listToTree = (list: API.MenuInfo[] = []): TreeSelectProps['treeData'] => {
  // 先构建一个父ID到子节点的映射
  const map = list.reduce((acc, node) => {
    const pid = node.pid || '0';
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(node);
    return acc;
  }, {} as Record<string, API.MenuInfo[]>);

  // 递归构建树
  const buildTree = (parentId: string = '0'): TreeSelectProps['treeData'] => {
    const children = map[parentId] || [];
    return children.map((node) => ({
      value: node.id!,
      title: node.name!,
      children: buildTree(node.id!),
    }));
  };

  return buildTree();
};

// 构建菜单树映射
const buildMenuTreeMap = (items: API.MenuInfo[]): Record<string, API.MenuInfo[]> => {
  if (!items) return {};

  return items?.reduce((treeMap, item) => {
    const pid = item.pid || '0';
    return {
      ...treeMap,
      [pid]: [...(treeMap[pid] || []), item],
    };
  }, {} as Record<string, API.MenuInfo[]>);
};

const NodeTitle: React.FC<{ title: string; icon: string }> = ({ title, icon }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'start' }}>
      <span style={{ marginRight: '6px' }}>
        <FontIcon type={icon} />
      </span>
      <span>{title}</span>
    </div>
  );
};

// 递归构建菜单树
const buildMenuTree = (items: API.MenuInfo[], parentId: string = '0'): TreeNodeProps[] => {
  return items
    .filter((menu) => menu.pid === parentId)
    .map((menu) => {
      const children = buildMenuTree(items, menu.id);
      if (children.length > 0) {
        return {
          key: menu.id as string,
          title: <NodeTitle title={menu.name!} icon={menu.icon!} />,
          children,
        };
      }

      return {
        key: menu.id as string,
        title: <NodeTitle title={menu.name!} icon={menu.icon!} />,
        children: [],
      } as TreeNodeProps;
    });
};

// 菜单树视图显示
const TreeTableLeft = ({
  // data
  dataSource,
  selectedKeys,
  expandedKeys,
  // events
  onSelect,
  onExpand,
}: {
  dataSource: API.MenuInfo[];
  selectedKeys: string[];
  expandedKeys: string[];
  onSelect: (keyPath: string[]) => void;
  onExpand: (keys: string[]) => void;
}) => {
  const [loading, setLoading] = useState(true);

  const menuItems = useMemo(() => {
    setLoading(true);
    // 创建根菜单项
    const rootMenuItem: MenuTreeItem = {
      key: 'root',
      title: <NodeTitle title="系统菜单" icon="icon-dashboard" />,
      children: [],
    };

    if (dataSource && dataSource.length > 0) {
      // 构建树形菜单并作为根菜单的子菜单
      rootMenuItem.children = buildMenuTree(dataSource);
    }

    setLoading(false);
    return [rootMenuItem];
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
            treeData={menuItems}
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
  const [visible, setVisible] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<string>('0'); // 默认为根菜单ID '0'
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0']);

  const { message } = App.useApp();

  const { permissionMap } = useRoleList();

  // 组装菜单列表和树
  const { data: menuList } = useRequest<API.MenuInfo[]>(async () => {
    const { data = [] } = await menuListMenu({});
    return {
      data,
    };
  });

  const menuTreeMap = useMemo(() => buildMenuTreeMap(menuList as API.MenuInfo[]), [menuList]);

  const kvOptions = useMemo(() => menuList?.map((item) => ({ label: item.name, value: item.id })), [menuList]);

  const treeData = useMemo(
    () => [{ label: '根菜单', value: '0' }, ...(listToTree(menuList as API.MenuInfo[]) || [])],
    [menuList],
  );

  const currentMenuList = useMemo(() => menuTreeMap[selectedMenuId] || [], [selectedMenuId]);

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

  // TableContent 组件，接收选择菜单的处理函数
  const TableTree = ({ dom }: { dom: React.ReactNode }) => (
    <div style={{ display: 'flex', width: '100%' }}>
      <TreeTableLeft
        dataSource={menuList as API.MenuInfo[]}
        onSelect={handleSelect}
        onExpand={handleExpand}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
      />
      <div style={{ flex: 1 }}>{dom}</div>
    </div>
  );

  // 表格渲染函数
  const tableRender = (_: any, dom: any) => <TableTree dom={dom} />;

  // 新增或编辑菜单
  const handleAddOrEditMenu = async (values: any) => {
    try {
      if (menuModalType === 'create') {
        await menuCreateMenu(values);
        message.success('添加成功');
      } else {
        if (selectedMenu) {
          await menuUpdateMenu({ id: selectedMenu.id! }, { ...values, id: selectedMenu.id });
          message.success('更新成功');
        }
      }
      setMenuModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
      return true;
    } catch (error) {
      message.error('操作失败');
      return false;
    }
  };

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
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
          <Button
            key="edit"
            type="link"
            onClick={() => {
              setVisible(true);
            }}
          >
            <EditOutlined /> 修改
          </Button>,
        ]}
        columns={columns}
        dataSource={currentMenuList}
        tableRender={tableRender}
      />

      <ModalForm
        title="菜单操作"
        open={visible}
        onOpenChange={setVisible}
        onValuesChange={(values) => {
          if (values['pid']) {
            console.log('pid', values['pid']);
          }
        }}
        initialValues={{
          icon: 'icon-earth',
          sort_by: 1,
          status: 0,
        }}
        onFinish={async (values) => {
          console.log('values', values);

          try {
            if (values.id) {
              await menuUpdateMenu({ id: values.id }, values);
            } else {
              await menuCreateMenu(values);
            }
            message.success('操作成功');
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
            options={Object.values(permissionMap).map((item) => ({ label: item.name, value: item.id }))}
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

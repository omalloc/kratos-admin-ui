import * as deptService from '@/services/console/department';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormGroup,
  ProFormSegmented,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { App, Badge, Button, Popconfirm, Space, Table, Typography, type TableColumnType } from 'antd';
import { useMemo, useRef, useState } from 'react';

type TreeNode = { value: string; title: string; children?: TreeNode[] };

type TreeTableNode = API.DepartmentInfo & { children?: TreeTableNode[] };

const buildTreeData = (list: API.DepartmentInfo[] = []): TreeNode[] => {
  const joinMap = list.reduce((acc, item) => {
    const pid = item.pid || '0';
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(item);
    return acc;
  }, {} as Record<string, API.DepartmentInfo[]>);
  const toTree = (pid: string = '0'): TreeNode[] =>
    (joinMap[pid] || []).map((node) => ({
      value: node.uid!,
      title: `${node.name}`,
      children: toTree(node.uid!),
    }));
  return toTree();
};

const buildTreeList = (dataSource: API.DepartmentInfo[] = []) => {
  const joinMap = dataSource.reduce((acc, item) => {
    const pid = item.pid || '0';
    if (!acc[pid]) acc[pid] = [];
    acc[pid].push(item);
    return acc;
  }, {} as Record<string, API.DepartmentInfo[]>);

  const toTreeList = (pid: string = '0'): TreeTableNode[] => {
    return (joinMap[pid] || []).map((node) => {
      const children = toTreeList(node!.uid);
      if (children.length) {
        return {
          ...node,
          children,
        };
      }
      return node;
    });
  };
  return toTreeList();
};

const DepartmentModal: React.FC<{
  open: boolean;
  uid?: string;
  treeData: TreeNode[];
  onCancel?: () => void;
  onOk?: () => void;
}> = ({ open, uid, treeData, onCancel, onOk }) => {
  return (
    <ModalForm<API.DepartmentInfo>
      open={open}
      title={uid ? '编辑部门' : '新建部门'}
      params={{ uid }}
      request={async (params) => {
        if (!params.uid) return {} as any;
        const { data } = await deptService.departmentGetDepartment({ uid: params.uid });
        return data || {};
      }}
      grid
      rowProps={{ gutter: [16, 0] }}
      modalProps={{ destroyOnHidden: true, onCancel }}
      onFinish={async (values) => {
        try {
          if (values.uid) {
            await deptService.departmentUpdateDepartment({ uid: values.uid }, values as API.UpdateDepartmentRequest);
          } else {
            await deptService.departmentCreateDepartment(values as API.CreateDepartmentRequest);
          }
          onOk?.();
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      }}
    >
      <ProFormText name="uid" hidden />
      <ProFormGroup style={{ marginTop: 24 }}>
        <ProFormText name="name" label="部门名称" colProps={{ span: 12 }} rules={[{ required: true }]} />
        <ProFormText name="code" label="编码" colProps={{ span: 12 }} />
      </ProFormGroup>
      <ProFormGroup>
        <ProFormTreeSelect
          name="pid"
          label="上级部门"
          request={async () => [{ label: '根部门', value: '0' } as any, ...(treeData as any)]}
          fieldProps={{
            treeDefaultExpandAll: false,
          }}
          colProps={{ span: 12 }}
        />
        <ProFormSegmented name="status" label="状态" valueEnum={{ 1: '启用', 2: '禁用' }} colProps={{ span: 12 }} />
      </ProFormGroup>
      <ProFormTextArea name="describe" label="描述" />
    </ModalForm>
  );
};

const DepartmentPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [currentUid, setCurrentUid] = useState<string | undefined>();

  // Preload all departments for tree select
  const { data: allDepartments = [] } = useRequest(async () => {
    const { data = [] } = await deptService.departmentListAllDepartment({});
    return {
      data,
    };
  });

  const treeData = useMemo(() => buildTreeData(allDepartments as API.DepartmentInfo[]), [allDepartments]);
  const treeTableData = useMemo(() => buildTreeList(allDepartments as API.DepartmentInfo[]), [allDepartments]);

  const handleAdd = () => {
    setCurrentUid(undefined);
    setOpen(true);
  };

  const handleEdit = (record: API.DepartmentInfo) => {
    setCurrentUid(record.uid);
    setOpen(true);
  };

  const handleDelete = async (uid: string) => {
    try {
      await deptService.departmentDeleteDepartment({ uid });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: TableColumnType<API.DepartmentInfo>[] = [
    {
      dataIndex: 'name',
      title: '部门名称',
      width: 280,
      render: (dom, record) => (
        <Space direction="vertical" size={0}>
          <span>{dom}</span>
          <Typography.Text type="secondary">{record.code}</Typography.Text>
        </Space>
      ),
    },
    {
      dataIndex: 'describe',
      title: '描述',
      ellipsis: true,
    },
    {
      dataIndex: 'status',
      title: '状态',
      render: (_, { status = 0 }) => (
        <Badge status={status === 1 ? 'success' : 'error'} text={status === 1 ? '启用' : '禁用'} />
      ),
      width: 120,
    },
    {
      dataIndex: 'updated_at',
      title: '更新时间',
      width: 180,
    },
    {
      key: 'option',
      title: '操作',
      width: 180,
      render: (_, record) => [
        <Button key="accept" size="small" color="primary" variant="link" onClick={() => handleEdit(record)}>
          授权
        </Button>,
        <Button key="edit" size="small" color="primary" variant="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>,
        <Popconfirm
          key="del"
          title="确定删除该部门吗？"
          okText="确认"
          cancelText="取消"
          placement="topRight"
          onConfirm={() => handleDelete(record.uid || '')}
        >
          <Button size="small" color="danger" variant="link">
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        新建部门
      </Button>
      <Table<API.DepartmentInfo> rowKey="uid" size="small" columns={columns} dataSource={treeTableData} />

      <DepartmentModal
        open={open}
        uid={currentUid}
        treeData={treeData}
        onCancel={() => {
          setOpen(false);
          setCurrentUid(undefined);
        }}
        onOk={() => {
          setOpen(false);
          setCurrentUid(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default DepartmentPage;

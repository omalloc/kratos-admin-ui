import {
  PageContainer,
  ProDescriptions,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { Empty, Tag } from 'antd';
import { useState } from 'react';

interface Action {
  name: string;
  describe?: string;
  checked: boolean;
}

interface DataAccess {
  name: string;
  option: 'all' | 'own' | 'none';
}

interface Permission {
  name: string;
  describe: string;
  actions: Action[];
  data_access?: DataAccess[];
}
interface Role {
  id: number;
  name: string;
  describe: string;
  permissions: Permission[];
}

// mock data
const dataSource: Role[] = [
  {
    id: 1,
    name: 'admin',
    describe: '超级管理员',
    permissions: [
      {
        name: 'user',
        describe: '用户管理',
        actions: [
          {
            name: 'GET',
            describe: '查询',
            checked: true,
          },
          {
            name: 'ADD',
            describe: '新增',
            checked: true,
          },
          {
            name: 'UPDATE',
            describe: '更新',
            checked: true,
          },
          {
            name: 'DELETE',
            describe: '删除',
            checked: true,
          },
        ],
      },
      {
        name: 'role',
        describe: '角色管理',
        actions: [
          {
            name: 'GET',
            describe: '查询',
            checked: true,
          },
          {
            name: 'ADD',
            describe: '新增',
            checked: true,
          },
          {
            name: 'UPDATE',
            describe: '更新',
            checked: true,
          },
          {
            name: 'DELETE',
            describe: '删除',
            checked: true,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'user',
    describe: '普通用户',
    permissions: [],
  },
];

const expandedRowRender = (record: Role) => {
  if (record.permissions.length <= 0) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="无任何授权 " />
    );
  }
  return (
    <ProDescriptions
      style={{ marginLeft: '48px' }}
      column={{ md: 1, xl: 2 }}
      title="已授权的模块权限"
    >
      {record.permissions.map((item) => {
        return (
          <ProDescriptions.Item key={item.name} label={item.describe}>
            {item.actions.map((action) => (
              <Tag key={action.name}>{action.describe}</Tag>
            ))}
          </ProDescriptions.Item>
        );
      })}
    </ProDescriptions>
  );
};

const RolePage: React.FC = () => {
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState();

  const columns: ProColumns[] = [
    { dataIndex: 'name', title: '角色名称', width: 200 },
    {
      dataIndex: 'describe',
      title: '描述',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      dataIndex: 'option',
      valueType: 'option',
      title: '操作',
      width: 150,
      render: () => <a>授权</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        expandable={{ expandedRowRender }}
      />
    </PageContainer>
  );
};

export default RolePage;

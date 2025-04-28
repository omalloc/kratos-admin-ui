import {
  ModalForm,
  PageContainer,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { App, Badge, Divider, Space, Tooltip, Typography } from 'antd';
import { useState } from 'react';

type UserNamespace = {
  name: string;
  describe: string;
  pflag: 'r' | 'rw';
};

type User = {
  id: string;
  username: string;
  password: string;
  nickname: string;
  email: string;
  role?: { name: string; describe: string };
  namespace?: UserNamespace[];
  disabled: boolean;
  created_at: string;
  updated_at: string;
};

const UserModal: React.FC<{
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
}> = ({ open, onCancel, onOk }) => {
  return (
    <ModalForm<User>
      open={open}
      title="用户配置"
      width={600}
      grid={true}
      rowProps={{
        gutter: [16, 0],
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
    >
      <ProFormText name="id" hidden />
      <ProFormGroup style={{ marginTop: '24px' }}>
        <ProFormText
          name="username"
          label="用户名"
          colProps={{ md: 12, xl: 12 }}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="nickname"
          label="昵称"
          colProps={{ md: 12, xl: 12 }}
        />
      </ProFormGroup>
      <ProFormText name="email" label="电子邮箱" rules={[{ required: true }]} />
      <ProFormGroup>
        <ProFormText.Password
          name="password"
          label="密码"
          rules={[{ required: true }]}
        />
        <ProFormText.Password
          name="re_password"
          label="确认密码"
          rules={[{ required: true }]}
        />
      </ProFormGroup>
      <ProFormRadio.Group
        name="status"
        label="状态"
        disabled={true}
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 2 },
        ]}
      />
      <Divider />
      <ProFormGroup>
        <ProFormSelect
          name="role"
          label="角色"
          mode="multiple"
          options={[
            { label: '管理员', value: '1' },
            { label: '某角色1', value: '2' },
            { label: '某角色2', value: '3' },
          ]}
        />
        <ProFormSelect
          name="namespace"
          label="授权命名空间"
          mode="multiple"
          options={[
            { label: '默认命名空间', value: '1' },
            { label: 'BLB命名空间', value: '2' },
            { label: '某命名空间1', value: '3' },
            { label: '某命名空间2', value: '4' },
          ]}
        />
      </ProFormGroup>
    </ModalForm>
  );
};

const UserPage: React.FC = () => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);

  const handleUpdateStatus = (id: string, disabled: boolean) => {
    message.info(`用户状态 -> ${disabled ? '禁用' : '正常'}`);
  };

  const columns: ProColumns<User>[] = [
    {
      dataIndex: 'id',
      title: 'ID',
      width: 90,
      hideInSearch: true,
    },
    {
      dataIndex: 'username',
      title: '用户名',
      width: 280,
      render: (dom, record) => (
        <Space direction="vertical">
          <Tooltip title={record.nickname}>
            <span>{dom}</span>
          </Tooltip>
          <Typography.Text type="secondary">{record.email}</Typography.Text>
        </Space>
      ),
    },
    {
      key: 'describe',
      title: '可访问资源及命名空间',
      hideInSearch: true,
      render: (_, { role, namespace }) => {
        return (
          <Space direction="vertical">
            <span>{role?.describe}</span>
            <Typography.Text type="secondary">
              {namespace?.map((item) => item.name).join(',')}
            </Typography.Text>
          </Space>
        );
      },
    },
    {
      key: 'status',
      title: '状态',
      width: 120,
      render: (_, { disabled = false }) => (
        <Badge
          status={disabled ? 'error' : 'processing'}
          text={disabled ? '禁止登录' : '正常'}
        />
      ),
    },
    {
      key: 'option',
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setOpen(true);
          }}
        >
          编辑
        </a>,
        <Divider key="split_1" type="vertical" />,
        <a
          key="disabled"
          onClick={() => handleUpdateStatus(record.id, !record.disabled)}
        >
          禁用
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<User>
        columns={columns}
        dataSource={[
          {
            id: '1',
            username: 'admin',
            password: 'admin',
            nickname: '我是管理员',
            email: 'admin@localhost',
            role: { name: 'admin', describe: '管理员' },
            namespace: [
              { name: 'default', describe: '默认命名空间', pflag: 'rw' },
            ],
            disabled: false,
            created_at: '2021-01-01 00:00:00',
            updated_at: '2021-01-01 00:00:00',
          },
        ]}
      />

      <UserModal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          // reload and close modal
          setOpen(false);
        }}
      />
    </PageContainer>
  );
};

export default UserPage;

import * as roleService from '@/services/console/role';
import * as userService from '@/services/console/user';
import { mergeData } from '@/utils/pagination';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { App, Badge, Button, Divider, Space, Tooltip, Typography } from 'antd';
import { useRef, useState } from 'react';

type User = {
  id: string;
  username: string;
  password?: string;
  nickname: string;
  email: string;
  avatar: string;
  status: number;
  role_ids: string[];
  created_at: string;
  updated_at: string;
};

const UserModal: React.FC<{
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  editing?: boolean;
  initialValues?: Partial<User>;
}> = ({ open, onCancel, onOk, editing = false, initialValues }) => {
  const { data: roleList = [] } = useRequest(() => roleService.roleGetAll());

  return (
    <ModalForm<User>
      open={open}
      title={editing ? '编辑用户' : '新建用户'}
      width={600}
      grid={true}
      rowProps={{
        gutter: [16, 0],
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel,
      }}
      initialValues={initialValues}
      onFinish={async (values) => {
        try {
          if (editing && values.id) {
            await userService.userUpdateUser(
              { id: values.id },
              values as API.UpdateUserRequest,
            );
          } else {
            await userService.userCreateUser(values as API.CreateUserRequest);
          }
          onOk?.();
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
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
      {!editing && (
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
      )}
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ]}
      />
      <Divider />
      <ProFormGroup>
        <ProFormSelect
          name="role_ids"
          label="角色"
          mode="multiple"
          options={roleList.map((role) => ({
            label: role.alias,
            value: role.id,
          }))}
        />
      </ProFormGroup>
    </ModalForm>
  );
};

const UserPage: React.FC = () => {
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>();
  const actionRef = useRef<ActionType>();
  const { data: roleList = [] } = useRequest(() => roleService.roleGetAll());

  const handleAdd = () => {
    setEditing(false);
    setCurrentUser(undefined);
    setOpen(true);
  };

  const handleEdit = (record: User) => {
    setEditing(true);
    setCurrentUser(record);
    setOpen(true);
  };

  const handleUpdateStatus = async (id: string, status: number) => {
    try {
      await userService.userUpdateUser({ id }, {
        status,
      } as API.UpdateUserRequest);
      message.success('状态更新成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await userService.userDeleteUser({ id });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
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
      key: 'roles',
      title: '角色',
      hideInSearch: true,
      render: (_, record) => {
        const roles = record.role_ids
          .map((roleId) => {
            const role = roleList.find((r) => String(r.id) === String(roleId));
            return role?.alias || '';
          })
          .filter(Boolean);
        return roles.join(', ') || '-';
      },
    },
    {
      key: 'status',
      title: '状态',
      width: 120,
      render: (_, { status = 0 }) => (
        <Badge
          status={status === 1 ? 'processing' : 'error'}
          text={status === 1 ? '正常' : '禁止登录'}
        />
      ),
    },
    {
      key: 'option',
      title: '操作',
      valueType: 'option',
      width: 180,
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <Divider key="split_1" type="vertical" />,
        <a
          key="disabled"
          onClick={() =>
            handleUpdateStatus(record.id, record.status === 0 ? 1 : 0)
          }
        >
          {record.status === 0 ? '禁用' : '启用'}
        </a>,
        <Divider key="split_2" type="vertical" />,
        <a key="delete" onClick={() => handleDelete(record.id)}>
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<User>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const res = await userService.userListUser(mergeData(params));
          return {
            data: res.data?.map((user) => ({
              ...user,
              role_ids: user.role_ids?.map((id) => String(id)) || [],
            })) as User[],
            total: res.pagination?.total,
            success: true,
          };
        }}
        columns={columns}
      />

      <UserModal
        open={open}
        editing={editing}
        initialValues={currentUser}
        onCancel={() => {
          setOpen(false);
          setEditing(false);
          setCurrentUser(undefined);
        }}
        onOk={() => {
          setOpen(false);
          setEditing(false);
          setCurrentUser(undefined);
          actionRef.current?.reload();
        }}
      />
    </PageContainer>
  );
};

export default UserPage;

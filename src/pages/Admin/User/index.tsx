import * as userService from '@/services/console/user';
import { mergeData } from '@/utils/pagination';
import { DeleteOutlined, DisconnectOutlined, EditOutlined, LinkOutlined } from '@ant-design/icons';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProTable,
  TableDropdown,
  type ProColumns,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, Avatar, Badge, Button, Divider, Space, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type User = {
  uid: string;
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

type UserModalProps = {
  open: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  editing?: boolean;
  initialValues?: Partial<User>;
};

const UserModal: React.FC<UserModalProps> = ({ open, onCancel, onOk, editing = false, initialValues }) => {
  const { roleMap } = useModel('role');

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
        destroyOnHidden: true,
        onCancel,
      }}
      initialValues={initialValues}
      onFinish={async (values) => {
        try {
          if (editing && values.uid) {
            await userService.userUpdateUser({ uid: values.uid }, values as API.UpdateUserRequest);
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
      <ProFormText name="uid" hidden />
      <ProFormGroup style={{ marginTop: '24px' }}>
        <ProFormText name="username" label="用户名" colProps={{ md: 12, xl: 12 }} rules={[{ required: true }]} />
        <ProFormText name="nickname" label="昵称" colProps={{ md: 12, xl: 12 }} />
      </ProFormGroup>
      <ProFormText name="email" label="电子邮箱" rules={[{ required: true }]} />
      {!editing && (
        <ProFormGroup>
          <ProFormText.Password name="password" label="密码" rules={[{ required: true }]} />
          <ProFormText.Password name="re_password" label="确认密码" rules={[{ required: true }]} />
        </ProFormGroup>
      )}
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          { label: '启用', value: 1 },
          { label: '禁用', value: 2 },
        ]}
      />
      <Divider />
      <ProFormGroup>
        <ProFormSelect
          name="role_ids"
          label="角色"
          mode="multiple"
          options={Object.values(roleMap).map((role) => ({
            label: role.alias,
            value: role.uid,
          }))}
        />
      </ProFormGroup>
    </ModalForm>
  );
};

const UserPage: React.FC = () => {
  const actionRef = useRef<ActionType>();

  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User>>();
  const { lastRole, roleMap } = useModel('role');

  const handleAdd = () => {
    setEditing(false);
    setCurrentUser({
      status: 1,
      role_ids: (lastRole?.uid && [lastRole?.uid]) || [],
    });
    setOpen(true);
  };

  const handleEdit = (record: User) => {
    setEditing(true);
    setCurrentUser(record);
    setOpen(true);
  };

  const handleUpdateStatus = async (uid: string, status: number) => {
    try {
      await userService.userUpdateUser({ uid }, {
        status,
      } as API.UpdateUserRequest);
      message.success('状态更新成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('状态更新失败');
    }
  };

  const handleDelete = async (uid: string) => {
    try {
      await userService.userDeleteUser({ uid });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: ProColumns<User>[] = [
    {
      dataIndex: 'avatar_id',
      title: '#',
      width: 80,
      render: (_, record) => <Avatar size={32}>{record.username.charAt(0).toUpperCase()}</Avatar>,
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
            const role = roleMap[roleId] || {};
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
      valueEnum: {
        1: { text: '正常', status: 'Processing' },
        2: { text: '禁止登录', status: 'Error' },
      },
      render: (_, { status = 0 }) => (
        <Badge status={status === 1 ? 'processing' : 'error'} text={status === 1 ? '正常' : '禁止登录'} />
      ),
    },
    {
      key: 'last_login',
      dataIndex: 'last_login',
      title: '最后登录时间',
      hideInSearch: true,
      renderText: (value) => (value ? dayjs(value).fromNow() : '-'),
    },
    {
      key: 'option',
      title: '操作',
      valueType: 'option',
      width: 140,
      render: (text, record, _, action) => [
        <Button
          key="edit"
          size="small"
          color="primary"
          variant="link"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
        <Divider key="divider" type="vertical" />,
        <TableDropdown
          key="actionGroup"
          onSelect={(key: string) => {
            if (key === 'delete') {
              handleDelete(record.uid);
              return;
            }
            if (key === 'disabled') {
              handleUpdateStatus(record.uid, record.status === 1 ? 2 : 1);
              return;
            }
          }}
          menus={[
            {
              key: 'disabled',
              name:
                record.status === 1 ? (
                  <span style={{ color: 'red' }}>
                    <DisconnectOutlined style={{ marginRight: '4px' }} />
                    禁止登录
                  </span>
                ) : (
                  <span>
                    <LinkOutlined style={{ marginRight: '4px' }} />
                    启用
                  </span>
                ),
            },
            {
              key: 'delete',
              name: (
                <span style={{ color: 'red' }}>
                  <DeleteOutlined style={{ marginRight: '4px' }} />
                  删除
                </span>
              ),
            },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<User>
        actionRef={actionRef}
        rowKey="uid"
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
        rowClassName={(_, index) => {
          if (index % 2 === 0) {
            return '';
          }
          return 'a-table-row-striped-odd';
        }}
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

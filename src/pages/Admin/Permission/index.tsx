import * as permissionService from '@/services/console/Permission';
import { mergeData } from '@/utils/pagination';
import {
  ModalForm,
  PageContainer,
  ProFormCheckbox,
  ProFormGroup,
  ProFormList,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { Button, Collapse, Divider, Tag } from 'antd';
import { useState } from 'react';

const defActions: API.Action[] = [
  {
    key: 'ADD',
    describe: '新增',
    checked: true,
  },
  {
    key: 'DELETE',
    describe: '删除',
    checked: true,
  },
  {
    key: 'UPDATE',
    describe: '更新',
    checked: true,
  },
  {
    key: 'READ',
    describe: '查询',
    checked: true,
  },
];

const statusMapColors: Record<number, string> = {
  2: 'pink',
  1: 'success',
  0: 'default',
};
const statusMapLabels: Record<number, string> = {
  2: '禁用',
  1: '启用',
  0: '未定义',
};

const PermissionPage: React.FC = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<API.PermissionInfo | undefined>();

  const handleAdd = () => {
    setEditing(false);
    setVisible(true);
    setFormData(undefined);
  };
  const handleEdit = (record: API.PermissionInfo) => {
    setEditing(true);
    setVisible(true);
    setFormData(record);
  };
  const handleCancel = () => {
    setVisible(false);
    setEditing(false);
    setFormData(undefined);
  };
  const columns: ProColumns<API.PermissionInfo>[] = [
    {
      dataIndex: 'name',
      title: '权限名称',
      renderText(text, record) {
        return (
          <>
            <span>{text}</span>
            <br />
            <span style={{ color: '#999' }}>{record.alias}</span>
          </>
        );
      },
      width: 150,
    },
    { dataIndex: 'describe', title: '描述', width: 300 },
    {
      dataIndex: 'actions',
      title: '操作权限',
      hideInSearch: true,
      render: (_, { actions = [] }) => (
        <div>
          {actions.map((item) => (
            <Tag key={item.key}>{item.describe}</Tag>
          ))}
        </div>
      ),
    },
    {
      dataIndex: 'status',
      title: '状态',
      renderText: (status) => (
        <Tag color={statusMapColors[status]}>{statusMapLabels[status]}</Tag>
      ),
      width: 100,
    },
    {
      key: 'option',
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.PermissionInfo>
        columns={columns}
        request={async (params) => {
          const res = await permissionService.PermissionListPermission(
            mergeData(params),
          );
          return {
            data: res.data,
            total: res.pagination?.total,
            success: true,
          };
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            新增权限
          </Button>,
        ]}
      />

      <ModalForm
        title={editing ? '编辑权限' : '新增权限'}
        open={visible}
        modalProps={{
          destroyOnClose: true,
          onCancel: handleCancel,
        }}
        request={async () => {
          return {
            ...formData,
            actions: formData?.actions || [...defActions],
          };
        }}
        onFinish={async (payload) => {
          console.log('form payload', payload);
          try {
            if (editing) {
              await permissionService.PermissionUpdatePermission(
                { id: payload.id || '' },
                payload,
              );
            } else {
              await permissionService.PermissionCreatePermission(payload);
            }
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormGroup>
          <ProFormText name="name" label="权限名称" colProps={{ span: 12 }} />
          <ProFormText name="alias" label="权限别名" colProps={{ span: 12 }} />
        </ProFormGroup>
        <ProFormTextArea name="describe" label="描述" />
        <Divider />
        <Collapse bordered={false} defaultActiveKey={editing ? ['1'] : []}>
          <Collapse.Panel key="1" header="附加项">
            <ProFormList name="actions" label="授权动作">
              <ProFormGroup>
                <ProFormText name="key" label="动作" width={120} />
                <ProFormText name="describe" label="描述" width={150} />
                <ProFormCheckbox name="checked" label="默认选中" width={70} />
              </ProFormGroup>
            </ProFormList>
          </Collapse.Panel>
        </Collapse>
      </ModalForm>
    </PageContainer>
  );
};

export default PermissionPage;

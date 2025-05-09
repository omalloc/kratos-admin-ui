import * as permissionService from '@/services/console/permission';
import { mergeData } from '@/utils/pagination';
import {
  ActionType,
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
import { App, Button, Collapse, Divider, Tag, type FormInstance } from 'antd';
import { useRef, useState } from 'react';

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
  const [editingId, setEditingId] = useState<string>();
  const [visible, setVisible] = useState<boolean>(false);
  const formRef = useRef<FormInstance<API.PermissionInfo>>();
  const ref = useRef<ActionType>();

  const { message } = App.useApp();

  const handleAdd = () => {
    setEditingId(undefined);
    setVisible(true);

    formRef.current?.resetFields();
  };

  const handleEdit = (record: API.PermissionInfo) => {
    setEditingId(record.id);
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingId(undefined);
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
    { dataIndex: 'describe', title: '描述', search: false, width: 300 },
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
      valueEnum: statusMapLabels,
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
        rowKey="id"
        actionRef={ref}
        columns={columns}
        request={async (params) => {
          const res = await permissionService.permissionListPermission(
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
        title={editingId ? `编辑权限` : '新增权限'}
        open={visible}
        formRef={formRef}
        params={{ id: editingId }}
        request={async (params: { id: string | undefined }) => {
          if (params.id === undefined) {
            return {};
          }

          const data = await permissionService.permissionGetPermission({
            id: params.id,
          });

          console.log('ModalForm', data);
          return {
            ...data,
          };
        }}
        modalProps={{
          destroyOnClose: true,
          onCancel: handleCancel,
        }}
        onFinish={async (payload) => {
          console.log('form payload', payload);
          try {
            if (editingId) {
              await permissionService.permissionUpdatePermission(
                { id: payload.id || '' },
                payload,
              );
              message.success('编辑成功');
            } else {
              await permissionService.permissionCreatePermission(payload);
              message.success('新增成功');
            }

            ref.current?.reload();
            handleCancel();
          } catch (error) {
            console.error(error);
            message.error('操作失败');
          }
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormGroup>
          <ProFormText
            name="name"
            label="权限名称"
            colProps={{ span: 12 }}
            required
            rules={[{ required: true, message: '请输入权限名称' }]}
          />
          <ProFormText
            name="alias"
            label="权限别名"
            colProps={{ span: 12 }}
            required
            rules={[{ required: true, message: '请输入权限别名' }]}
          />
        </ProFormGroup>
        <ProFormTextArea name="describe" label="描述" />
        <Divider />
        <Collapse
          bordered={false}
          defaultActiveKey={editingId ? ['1'] : []}
          items={[
            {
              key: '1',
              label: '附加项',
              forceRender: true,
              children: (
                <ProFormList
                  name="actions"
                  label={
                    <span>
                      授权动作
                      <Button
                        type="link"
                        onClick={() => {
                          formRef.current?.setFieldValue('actions', [
                            ...defActions,
                          ]);
                        }}
                      >
                        填充默认
                      </Button>
                    </span>
                  }
                >
                  <ProFormGroup>
                    <ProFormText name="key" label="动作" width={120} />
                    <ProFormText name="describe" label="描述" width={150} />
                    <ProFormCheckbox
                      name="checked"
                      label="默认选中"
                      width={70}
                    />
                  </ProFormGroup>
                </ProFormList>
              ),
            },
          ]}
        ></Collapse>
      </ModalForm>
    </PageContainer>
  );
};

export default PermissionPage;

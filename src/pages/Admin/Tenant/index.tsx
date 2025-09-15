import * as tenantService from '@/services/console/tenant';
import { mergeData } from '@/utils/pagination';
import {
  ActionType,
  ModalForm,
  PageContainer,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { App, Button, Popconfirm, Space } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

const TenantModal: React.FC<{
  open: boolean;
  uid?: string;
  onCancel?: () => void;
  onOk?: () => void;
}> = ({ open, uid, onCancel, onOk }) => {
  return (
    <ModalForm<API.TenantInfo>
      open={open}
      title={uid ? '编辑租户' : '新建租户'}
      params={{ uid }}
      request={async (params) => {
        if (!params.uid) return {};
        const { data } = await tenantService.tenantGetTenant({ uid: params.uid });
        return data || {};
      }}
      grid
      rowProps={{ gutter: [16, 0] }}
      modalProps={{ destroyOnHidden: true, onCancel }}
      onFinish={async (values) => {
        try {
          if (values.uid) {
            await tenantService.tenantUpdateTenant({ uid: values.uid }, values as API.UpdateTenantRequest);
          } else {
            await tenantService.tenantCreateTenant(values as API.CreateTenantRequest);
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
        <ProFormText name="name" label="租户标识" colProps={{ span: 12 }} rules={[{ required: true }]} />
        <ProFormText name="alias" label="租户名称" colProps={{ span: 12 }} rules={[{ required: true }]} />
      </ProFormGroup>
      <ProFormTextArea name="describe" label="描述" />
    </ModalForm>
  );
};

const TenantPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();
  const [open, setOpen] = useState(false);
  const [currentUid, setCurrentUid] = useState<string | undefined>();

  const handleAdd = () => {
    setCurrentUid(undefined);
    setOpen(true);
  };

  const handleEdit = async (record: API.TenantInfo) => {
    setCurrentUid(record.uid);
    setOpen(true);
  };

  const handleDelete = async (uid: string) => {
    try {
      await tenantService.tenantDeleteTenant({ uid });
      message.success('删除成功');
      actionRef.current?.reload();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const columns: ProColumns<API.TenantInfo>[] = [
    {
      dataIndex: 'name',
      title: '租户标识',
      width: 220,
      renderText: (text, record) => (
        <Space direction="vertical" size={0}>
          <span>{text}</span>
          <span style={{ color: '#999' }}>{record.alias}</span>
        </Space>
      ),
    },
    {
      dataIndex: 'describe',
      title: '描述',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      dataIndex: 'created_at',
      title: '创建时间',
      width: 160,
      renderText: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
      hideInSearch: true,
    },
    {
      dataIndex: 'updated_at',
      title: '更新时间',
      width: 160,
      renderText: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
      hideInSearch: true,
    },
    {
      key: 'option',
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <Button key="edit" size="small" color="primary" variant="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>,
        <Popconfirm
          key="del"
          title="确定删除该租户吗？"
          okText="确认"
          cancelText="取消"
          placement="topRight"
          onConfirm={() => handleDelete(record.uid || '')}
        >
          <Button size="small" color="danger" variant="link" disabled={!record.allow_deleted}>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.TenantInfo>
        actionRef={actionRef}
        rowKey="uid"
        columns={columns}
        toolBarRender={() => [
          <Button key="add" type="primary" onClick={handleAdd}>
            新建
          </Button>,
        ]}
        request={async (params) => {
          const res = await tenantService.tenantListTenant(mergeData(params));
          return {
            data: res.data,
            total: res.pagination?.total,
            success: true,
          };
        }}
        rowClassName={(_, index) => (index % 2 === 0 ? '' : 'a-table-row-striped-odd')}
      />

      <TenantModal
        open={open}
        uid={currentUid}
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

export default TenantPage;

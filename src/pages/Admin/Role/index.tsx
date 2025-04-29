import * as permissionService from '@/services/console/permission';
import * as roleService from '@/services/console/role';
import { mergeData } from '@/utils/pagination';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormFieldSet,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ProColumns,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Col, Empty, Row, Tag, type FormInstance } from 'antd';
import { useMemo, useRef, useState } from 'react';

interface DataAccess {
  name: string;
  option: 'all' | 'own' | 'none';
}

const expandedRowRender = (record: Required<API.RoleInfo>) => {
  if (record.permissions && record.permissions.length <= 0) {
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
      {record.permissions.map((item: API.RolePermission) => {
        return (
          <ProDescriptions.Item key={item.id} label={item.perm_id}>
            {item.actions!.map((action) => (
              <Tag key={action.key}>{action.describe}</Tag>
            ))}
          </ProDescriptions.Item>
        );
      })}
    </ProDescriptions>
  );
};

const RolePage: React.FC = () => {
  const [currentId, setCurrentId] = useState<string>();
  const [visible, setVisible] = useState(false);
  const [authorizeVisible, setAuthorizeVisible] = useState(false);
  const actionRef = useRef();
  const formRef = useRef<FormInstance<API.RoleInfo>>();
  const authorizeRef = useRef<FormInstance<API.RoleInfo>>();

  const { data: permissionList = [] } = useRequest(
    () => permissionService.permissionListAllPermission(),
    {
      onSuccess: (res) => {
        console.log('permissionList', res);
      },
    },
  );

  const permissionMap = useMemo(() => {
    return Object.fromEntries(permissionList.map((item) => [item.id, item]));
  }, [permissionList]);

  const handleAdd = () => {
    setVisible(true);
    setEditing(false);
    formRef.current?.resetFields();
  };
  const handleEdit = (record: API.RoleInfo) => {
    setVisible(true);

    formRef.current?.setFieldsValue({ ...record });
  };
  const handleAuthorize = (record: API.RoleInfo) => {
    console.log('handleAuthorize.record', record);
    setAuthorizeVisible(true);
    setCurrentId(record.id);
    authorizeRef.current?.setFieldsValue({
      id: record.id,
      permissions: record.permissions,
    });
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const columns: ProColumns<API.RoleInfo>[] = [
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
      render: (_, record) => [
        <a key="authorize" onClick={() => handleAuthorize(record)}>
          授权
        </a>,
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RoleInfo>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={async (params) => {
          const res = await roleService.roleListRole(mergeData(params));
          return {
            data: res.data,
            total: 0,
            success: true,
          };
        }}
        expandable={{ expandedRowRender }}
        toolBarRender={() => {
          return [
            <Button key="add" type="primary" onClick={handleAdd}>
              新增
            </Button>,
          ];
        }}
      />

      <ModalForm
        formRef={formRef}
        open={visible}
        onFinish={async (values) => {
          console.log('values', values);
        }}
        modalProps={{
          destroyOnClose: false,
          onCancel: handleCancel,
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormGroup>
          <ProFormText
            name="name"
            label="角色标识"
            help="角色标识是唯一的，不能重复"
            rules={[{ required: true, message: '请输入角色名称' }]}
          />
          <ProFormText
            name="alias"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          />
        </ProFormGroup>
        <ProFormTextArea
          name="describe"
          label="描述"
          rules={[{ required: true, message: '请输入描述' }]}
        />
      </ModalForm>

      <ModalForm
        title="授权"
        formRef={authorizeRef}
        open={authorizeVisible}
        onFinish={async (values) => {
          console.log('values', values);
        }}
        params={{
          currentId,
        }}
        request={async (params) => {
          console.log('params', params);
          const res = await roleService.roleGetRole({
            id: params.currentId,
          } as any);
          console.log('res', res);

          return {
            ...res,
          };
        }}
        modalProps={{
          destroyOnClose: false,
          onCancel: () => {
            setAuthorizeVisible(false);
          },
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormFieldSet name="permissions" label="授权模块" type="group">
          {(meta, index) => {
            console.log('meta', meta, 'index', index);

            const currentMap = meta.reduce(
              (kv, item) => {
                kv[item.id] = item;
                return kv;
              },
              {} as Record<string, API.RolePermission>,
            );

            return (
              <Row gutter={24}>
                {permissionList.map((item) => {
                  const perm = currentMap[item.id || 0];
                  const checkedAll =
                    perm?.actions.length === item.actions?.length;
                  const actionKeyMap =
                    perm?.actions.reduce(
                      (kv, item: any) => {
                        kv[item.key] = item;
                        return kv;
                      },
                      {} as Record<string, any>,
                    ) || {};
                  console.log('actionKeyMap', actionKeyMap);

                  return (
                    <Col key={item.id} span={24} style={{ marginBottom: 12 }}>
                      <Row gutter={16}>
                        <Col span={4} style={{ textAlign: 'right' }}>
                          {item.name}:
                        </Col>
                        <Col span={20}>
                          <Tag.CheckableTag key="all" checked={checkedAll}>
                            全选
                          </Tag.CheckableTag>
                          {item.actions!.map((action, idx) => {
                            return (
                              <Tag.CheckableTag
                                key={action.key}
                                checked={!!actionKeyMap[action.key || '']}
                                onChange={(checked) => {
                                  console.log(
                                    item.id,
                                    action.key,
                                    'checked',
                                    checked,
                                  );

                                  perm?.actions[idx].checked = checked;
                                }}
                              >
                                {action.describe}
                              </Tag.CheckableTag>
                            );
                          })}
                        </Col>
                      </Row>
                    </Col>
                  );
                })}
              </Row>
            );
            // return <div>123</div>;
          }}
        </ProFormFieldSet>
      </ModalForm>
    </PageContainer>
  );
};

const PermissionSelectList: React.FC = () => {};

export default RolePage;

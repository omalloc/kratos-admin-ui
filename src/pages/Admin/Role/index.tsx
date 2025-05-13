import * as permissionService from '@/services/console/permission';
import * as roleService from '@/services/console/role';
import { mergeData } from '@/utils/pagination';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProForm,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { App, Button, Col, Empty, Row, Tag, Tooltip } from 'antd';
import { useRef, useState } from 'react';

interface DataAccess {
  name: string;
  option: 'all' | 'own' | 'none';
}

type PermissionSelectListProps = {
  id: string;
  value: API.RolePermission[];
  onChange: (value: API.RolePermission[]) => void;
  dataSource: Record<string, Required<API.PermissionInfo>>;
};

const PermissionSelectList: React.FC<PermissionSelectListProps> = (props) => {
  const { id, value = [], onChange, dataSource } = props;
  const permissionMap = value.reduce<Record<string, API.RolePermission>>((kv, item) => {
    kv[item.perm_id || ''] = item;
    return kv;
  }, {});

  const onCheckboxChange = (permissionId: string = '', item: API.Action, checked: boolean) => {
    if (permissionMap[permissionId] === undefined) {
      permissionMap[permissionId] = {
        perm_id: permissionId,
        actions: [],
        data_access: [],
      };
    }

    if (checked) {
      permissionMap[permissionId].actions?.push(item);
    } else {
      const index = (permissionMap[permissionId].actions || []).findIndex((x) => x.key === item.key);
      if (index > -1) {
        permissionMap[permissionId]?.actions!.splice(index, 1);
      }
    }

    onChange(Object.values(permissionMap));
  };

  const onCheckedAllChange = (permissionId: string = '', perm: API.RolePermission, checked: boolean) => {
    if (permissionMap[permissionId] === undefined) {
      permissionMap[permissionId] = {
        perm_id: permissionId,
        actions: [],
        data_access: [],
      };
    }

    if (checked) {
      permissionMap[permissionId].actions = [...(perm.actions || [])];
    } else {
      permissionMap[permissionId].actions = [];
    }

    onChange(Object.values(permissionMap));
  };

  return (
    <Row id={id} gutter={24}>
      {Object.values(dataSource).map((item) => {
        const perm = permissionMap[item.id || '0'];
        const checkedAll = perm?.actions?.length === item.actions?.length;
        const curActions = (perm?.actions || []).reduce<Record<string, API.Action>>((kv, item) => {
          if (item.key) {
            kv[item.key] = item;
          }
          return kv;
        }, {});

        return (
          <Col key={item.id} span={24} style={{ marginBottom: 12 }}>
            <Row gutter={16}>
              <Col span={4} style={{ textAlign: 'right' }}>
                {item.name}:
              </Col>
              <Col span={20}>
                <Tag.CheckableTag
                  key="all"
                  style={{ userSelect: 'none' }}
                  checked={checkedAll}
                  onChange={(checked) => {
                    onCheckedAllChange(item.id, item, checked);
                  }}
                >
                  全选
                </Tag.CheckableTag>
                {item.actions!.map((action) => {
                  return (
                    <Tag.CheckableTag
                      key={action.key}
                      style={{ userSelect: 'none' }}
                      checked={curActions[action.key || ''] !== undefined}
                      onChange={(checked) => {
                        onCheckboxChange(item.id, action, checked);
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
};

const ProPermissionSelectList: React.FC<any> = ({ fieldProps, dataSource, ...rest }) => {
  return (
    <ProForm.Item {...rest}>
      <PermissionSelectList dataSource={dataSource} {...fieldProps} />
    </ProForm.Item>
  );
};

const expandedRowRender = (record: API.RoleInfo, permissionMap: Record<string, Required<API.PermissionInfo>>) => {
  if (!record.permissions || record.permissions.length <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="无任何授权 " />;
  }

  return (
    <ProDescriptions style={{ marginLeft: '48px' }} column={{ sm: 1, md: 1, lg: 1, xl: 2 }} title="已授权的模块权限">
      {record.permissions.map((item: API.RolePermission) => {
        if (!item.perm_id) {
          return null;
        }
        const perm = permissionMap[item.perm_id];

        return (
          <ProDescriptions.Item key={item.id} label={<Tooltip title={perm.name}>{perm.alias}</Tooltip>}>
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
  const { message } = App.useApp();

  const [currentId, setCurrentId] = useState<string>();
  const [editVisible, setEditVisible] = useState(false);
  const [authorizeVisible, setAuthorizeVisible] = useState(false);
  const actionRef = useRef<ActionType>();

  const { data: permissionMap = {} } = useRequest(() => permissionService.permissionListAllPermission(), {
    formatResult: (res) => {
      return res.data?.reduce<Record<string, Required<API.PermissionInfo>>>((kv, item) => {
        kv[item.id || ''] = item as Required<API.PermissionInfo>;
        return kv;
      }, {});
    },
  });

  const handleAdd = () => {
    setEditVisible(true);
    setCurrentId(undefined);
  };
  const handleEdit = (record: API.RoleInfo) => {
    setEditVisible(true);
    setCurrentId(record.id);
  };
  const handleAuthorize = (record: API.RoleInfo) => {
    setAuthorizeVisible(true);
    setCurrentId(record.id);
  };
  const handleCancel = () => {
    setCurrentId(undefined);
    setEditVisible(false);
  };

  const columns: ProColumns<API.RoleInfo>[] = [
    { dataIndex: 'name', title: '角色标识', width: 200 },
    {
      dataIndex: 'alias',
      title: '角色名称',
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
        expandable={{ expandedRowRender: (record) => expandedRowRender(record, permissionMap) }}
        toolBarRender={() => {
          return [
            <Button key="add" type="primary" onClick={handleAdd}>
              新增
            </Button>,
          ];
        }}
      />

      <ModalForm<API.RoleInfo>
        open={editVisible}
        params={{
          currentId,
        }}
        request={async (params) => {
          if (!params.currentId) {
            return {
              id: undefined,
            };
          }

          const data = await roleService.roleGetRole({ id: params.currentId });
          return {
            ...data,
          };
        }}
        onFinish={async (payload) => {
          console.log('values', payload);
          try {
            if (payload.id) {
              await roleService.roleUpdateRole({ id: payload.id || '' }, payload);
              message.success('编辑成功');
            } else {
              await roleService.roleCreateRole(payload);
              message.success('新增成功');
            }

            actionRef.current?.reload();
            handleCancel();
          } catch (error) {
            console.error(error);
            message.error('操作失败');
          }
        }}
        modalProps={{
          destroyOnHidden: true,
          onCancel: handleCancel,
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormGroup>
          <ProFormText
            name="name"
            label="角色标识"
            help="角色标识是唯一的，不能重复"
            rules={[{ required: true, message: '请输入角色标识' }]}
          />
          <ProFormText name="alias" label="角色名称" rules={[{ required: true, message: '请输入角色名称' }]} />
        </ProFormGroup>
        <ProFormTextArea name="describe" label="描述" rules={[{ required: true, message: '请输入描述' }]} />
      </ModalForm>

      <ModalForm<API.RoleInfo>
        title="授权"
        open={authorizeVisible}
        params={{
          currentId,
        }}
        request={async (params) => {
          if (!params.currentId) {
            message.error('授权目标不存在');
            return {
              id: undefined,
              permissions: [],
            };
          }

          const data = await roleService.roleGetRole({ id: params.currentId });
          return {
            id: data.id,
            permissions: data.permissions || [],
          };
        }}
        modalProps={{
          destroyOnHidden: true,
          onCancel: () => {
            setAuthorizeVisible(false);
          },
        }}
        onFinish={async (values) => {
          try {
            await roleService.roleBindPermission(
              { id: values.id || '' },
              {
                data: values.permissions?.map((value) => {
                  return {
                    permission_id: value.perm_id,
                    actions: value.actions,
                    data_access: value.data_access,
                  };
                }),
              },
            );
            message.success('授权成功');
            actionRef.current?.reload();
            setAuthorizeVisible(false);
          } catch (error) {
            console.error(error);
            message.error('授权失败');
          }
        }}
      >
        <ProFormText name="id" hidden />
        <ProPermissionSelectList name="permissions" dataSource={permissionMap} label="授权模块" />
      </ModalForm>
    </PageContainer>
  );
};

export default RolePage;

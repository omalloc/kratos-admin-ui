import * as roleService from '@/services/console/role';
import { mergeData } from '@/utils/pagination';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormGroup,
  ProFormText,
  ProFormTextArea,
  ProTable,
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { App, Button, Col, Descriptions, Empty, Row, Tag, Tooltip } from 'antd';
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
    <Row key={id} gutter={24}>
      {Object.values(dataSource).map((item) => {
        const perm = permissionMap[item.uid || '0'];
        const checkedAll = perm?.actions?.length === item.actions?.length;
        const curActions = (perm?.actions || []).reduce<Record<string, API.Action>>((kv, item) => {
          if (item.key) {
            kv[item.key] = item;
          }
          return kv;
        }, {});

        return (
          <Col key={item.uid} span={24} style={{ marginBottom: 12 }}>
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
                    onCheckedAllChange(item.uid, item, checked);
                  }}
                >
                  全选
                </Tag.CheckableTag>
                {item.actions?.map((action) => {
                  return (
                    <Tag.CheckableTag
                      key={action.key}
                      style={{ userSelect: 'none' }}
                      checked={curActions[action.key || ''] !== undefined}
                      onChange={(checked) => {
                        onCheckboxChange(item.uid, action, checked);
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

const expandedRowRender = (record: API.RoleInfo, permissionMap: Record<string, API.PermissionInfo>) => {
  if (!record.permissions || record.permissions.length <= 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="无任何授权 " />;
  }

  return (
    <Descriptions key={record.uid} style={{ marginLeft: '48px' }} column={2} title="已授权的模块权限">
      {record.permissions.map((item: API.RolePermission) => {
        if (!item.perm_id) {
          return null;
        }
        const perm = permissionMap[item.perm_id];
        return (
          <Descriptions.Item key={item.perm_id} label={<Tooltip title={perm.name}>{perm.alias}</Tooltip>}>
            {item.actions!.map((action) => (
              <Tag key={action.key}>{action.describe}</Tag>
            ))}
          </Descriptions.Item>
        );
      })}
    </Descriptions>
  );
};

const RolePage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { message } = App.useApp();
  const { permissionMap, loading } = useModel('permission');
  const [currentId, setCurrentId] = useState<string>();
  const [editVisible, setEditVisible] = useState(false);
  const [authorizeVisible, setAuthorizeVisible] = useState(false);

  const handleAdd = () => {
    setEditVisible(true);
    setCurrentId(undefined);
  };
  const handleEdit = (record: API.RoleInfo) => {
    setEditVisible(true);
    setCurrentId(record.uid);
  };
  const handleAuthorize = (record: API.RoleInfo) => {
    setAuthorizeVisible(true);
    setCurrentId(record.uid);
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
        <Button
          size="small"
          color="default"
          variant="link"
          key="authorize"
          disabled={record.name === 'root'}
          onClick={() => handleAuthorize(record)}
        >
          授权
        </Button>,
        <Button
          size="small"
          color="default"
          variant="link"
          key="edit"
          disabled={record.name === 'root'}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer loading={loading}>
      <ProTable<API.RoleInfo>
        rowKey="uid"
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
        rowClassName={(_, index) => {
          if (index % 2 === 0) {
            return '';
          }
          return 'a-table-row-striped-odd';
        }}
        expandable={{
          expandRowByClick: false,
          expandedRowRender: (record) => expandedRowRender(record, permissionMap),
        }}
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
            return {};
          }

          const data = await roleService.roleGetRole({ uid: params.currentId });
          return {
            ...data,
          };
        }}
        onFinish={async (payload) => {
          console.log('values', payload);
          try {
            if (payload.uid) {
              await roleService.roleUpdateRole({ uid: payload.uid || '' }, payload);
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
        <ProFormText name="uid" hidden />
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
              uid: undefined,
              permissions: [],
            };
          }

          const data = await roleService.roleGetRole({ uid: params.currentId });
          return {
            uid: data.uid,
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
              { uid: values.uid || '' },
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
        <ProFormText name="uid" hidden />
        <ProPermissionSelectList name="permissions" dataSource={permissionMap} label="授权模块" />
      </ModalForm>
    </PageContainer>
  );
};

export default RolePage;

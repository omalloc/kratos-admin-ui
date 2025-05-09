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
  type ActionType,
  type ProColumns,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { App, Button, Col, Empty, Row, Tag, type FormInstance } from 'antd';
import { useMemo, useRef, useState } from 'react';

interface DataAccess {
  name: string;
  option: 'all' | 'own' | 'none';
}

const expandedRowRender = (record: API.RoleInfo) => {
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
      {record.permissions?.map((item: API.RolePermission) => {
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
  const [editing, setEditing] = useState<boolean>(false);
  const [authorizeVisible, setAuthorizeVisible] = useState(false);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance<API.RoleInfo>>();
  const authorizeRef = useRef<FormInstance<API.RoleInfo>>();
  const [checkedMap, setCheckedMap] = useState<
    Record<
      string,
      {
        item: API.PermissionInfo;
        actions: Record<string, API.Action>;
      }
    >
  >({});

  const { message } = App.useApp();

  const { data: permissionList = [] } = useRequest(
    () => permissionService.permissionListAllPermission(),
    {
      onSuccess: (res: API.PermissionInfo[]) => {
        console.log('permissionList', res);
        setCheckedMap({});
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
    setEditing(true);
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
        onFinish={async (payload) => {
          console.log('values', payload);
          try {
            if (editing) {
              await roleService.roleUpdateRole(
                { id: payload.id || '' },
                payload,
              );
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
            rules={[{ required: true, message: '请输入角色标识' }]}
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
          console.log('checkedMap', checkedMap);

          try {
            // 将 checkedMap 转换为后端需要的格式
            const data = Object.entries(checkedMap).map(([itemId, data]) => ({
              permission_id: itemId,
              actions: Object.entries(data.actions)
                .filter(([_, action]) => action.checked)
                .map(([_, action]) => action),
              data_access: [], // 暂时为空数组
            }));

            // 调用 roleBindPermission
            await roleService.roleBindPermission(
              { id: values.id },
              {
                id: values.id,
                data,
              },
            );

            message.success('授权成功');
            setAuthorizeVisible(false);
            actionRef.current?.reload();
          } catch (error) {
            console.error(error);
            message.error('授权失败');
          }
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

          // 初始化 checkedMap
          const initialCheckedMap: Record<
            string,
            {
              item: API.PermissionInfo;
              actions: Record<string, API.Action>;
            }
          > = {};

          // 遍历权限列表，设置初始选中状态
          permissionList.forEach((perm: API.PermissionInfo) => {
            const existingPermission = res.permissions?.find(
              (p) => p.perm_id === perm.id,
            );
            if (existingPermission) {
              initialCheckedMap[perm.id] = {
                item: perm,
                actions: {},
              };
              // 设置已选中的 actions
              existingPermission.actions?.forEach((action) => {
                if (action.key) {
                  initialCheckedMap[perm.id].actions[action.key] = {
                    ...action,
                    checked: true,
                  };
                }
              });
            }
          });

          setCheckedMap(initialCheckedMap);

          return {
            ...res,
          };
        }}
        modalProps={{
          destroyOnClose: false,
          onCancel: () => {
            setAuthorizeVisible(false);
            setCheckedMap({});
          },
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormFieldSet name="permissions" label="授权模块" type="group">
          {(meta, index) => {
            console.log('meta', meta, 'index', index);

            const handleChange = (item, action, checked) => {
              const newCheckedMap = { ...checkedMap };

              if (checked) {
                // 如果选中，添加到 checkedMap
                if (!newCheckedMap[item.id]) {
                  newCheckedMap[item.id] = {
                    item,
                    actions: {},
                  };
                }
                newCheckedMap[item.id].actions[action.key] = {
                  ...action,
                  checked: true,
                };
              } else {
                // 如果取消选中，将 checked 设置为 false
                if (newCheckedMap[item.id]) {
                  newCheckedMap[item.id].actions[action.key] = {
                    ...action,
                    checked: false,
                  };
                }
              }

              setCheckedMap(newCheckedMap);
              console.log('checkedMap after update:', newCheckedMap);
            };

            return (
              <Row gutter={24}>
                {permissionList.map((item) => {
                  const perm = checkedMap[item.id];
                  const checkedAll =
                    perm?.actions &&
                    item.actions?.every(
                      (action) => perm.actions[action.key]?.checked === true,
                    );

                  return (
                    <Col key={item.id} span={24} style={{ marginBottom: 12 }}>
                      <Row gutter={16}>
                        <Col span={4} style={{ textAlign: 'right' }}>
                          {item.name}:
                        </Col>
                        <Col span={20}>
                          <Tag.CheckableTag
                            key="all"
                            checked={checkedAll}
                            onChange={(checked) => {
                              // 全选/取消全选
                              const newCheckedMap = { ...checkedMap };
                              if (!newCheckedMap[item.id]) {
                                newCheckedMap[item.id] = {
                                  item,
                                  actions: {},
                                };
                              }
                              // 更新所有 action 的 checked 状态
                              item.actions?.forEach((action) => {
                                newCheckedMap[item.id].actions[action.key] = {
                                  ...action,
                                  checked,
                                };
                              });
                              setCheckedMap(newCheckedMap);
                            }}
                          >
                            全选
                          </Tag.CheckableTag>
                          {item.actions!.map((action) => {
                            const isChecked =
                              checkedMap[item.id]?.actions?.[action.key]
                                ?.checked;
                            return (
                              <Tag.CheckableTag
                                key={action.key}
                                checked={isChecked}
                                onChange={(checked) =>
                                  handleChange(item, action, checked)
                                }
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
          }}
        </ProFormFieldSet>
      </ModalForm>
    </PageContainer>
  );
};

const PermissionSelectList: React.FC = () => {};

export default RolePage;

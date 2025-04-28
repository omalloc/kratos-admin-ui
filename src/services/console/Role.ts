// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/role */
export async function RoleListRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleListRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.ListRoleReply>('/api/console/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/role */
export async function RoleCreateRole(
  body: API.CreateRoleRequest,
  options?: { [key: string]: any },
) {
  return request<API.CreateRoleReply>('/api/console/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/role/${param0} */
export async function RoleGetRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleGetRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetRoleReply>(`/api/console/role/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/role/${param0} */
export async function RoleUpdateRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleUpdateRoleParams,
  body: API.UpdateRoleRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdateRoleReply>(`/api/console/role/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/role/${param0} */
export async function RoleDeleteRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleDeleteRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DeleteRoleReply>(`/api/console/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/role/${param0}/permission */
export async function RoleBindPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleBindPermissionParams,
  body: API.BindPermissionRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BindPermissionReply>(`/api/console/role/${param0}/permission`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/role/${param0}/permission/${param1} */
export async function RoleUnbindPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.RoleUnbindPermissionParams,
  body: API.UnbindPermissionRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, permission_id: param1, ...queryParams } = params;
  return request<API.UnbindPermissionReply>(`/api/console/role/${param0}/permission/${param1}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

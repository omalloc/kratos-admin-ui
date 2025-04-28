// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/user */
export async function UserListUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserListUserParams,
  options?: { [key: string]: any },
) {
  return request<API.ListUserReply>('/api/console/user', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/user */
export async function UserCreateUser(
  body: API.CreateUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.CreateUserReply>('/api/console/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/user/${param0} */
export async function UserGetUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserGetUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetUserReply>(`/api/console/user/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/user/${param0} */
export async function UserUpdateUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserUpdateUserParams,
  body: API.UpdateUserRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdateUserReply>(`/api/console/user/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/user/${param0} */
export async function UserDeleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserDeleteUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DeleteUserReply>(`/api/console/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/user/${param0}/namespace */
export async function UserBindNamespace(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserBindNamespaceParams,
  body: API.BindNamespaceRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BindNamespaceReply>(`/api/console/user/${param0}/namespace`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/user/${param0}/namespace/${param1} */
export async function UserUnbindNamespace(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserUnbindNamespaceParams,
  options?: { [key: string]: any },
) {
  const { id: param0, namespace_id: param1, ...queryParams } = params;
  return request<API.UnbindNamespaceReply>(`/api/console/user/${param0}/namespace/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/user/${param0}/role */
export async function UserBindRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserBindRoleParams,
  body: API.BindRoleRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.BindRoleReply>(`/api/console/user/${param0}/role`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/user/${param0}/role/${param1} */
export async function UserUnbindRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.UserUnbindRoleParams,
  options?: { [key: string]: any },
) {
  const { id: param0, role_id: param1, ...queryParams } = params;
  return request<API.UnbindRoleReply>(`/api/console/user/${param0}/role/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

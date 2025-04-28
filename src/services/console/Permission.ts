// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/permission */
export async function PermissionListPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionListPermissionParams,
  options?: { [key: string]: any },
) {
  return request<API.ListPermissionReply>('/api/console/permission', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/permission */
export async function PermissionCreatePermission(
  body: API.CreatePermissionRequest,
  options?: { [key: string]: any },
) {
  return request<API.CreatePermissionReply>('/api/console/permission', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/permission/${param0} */
export async function PermissionGetPermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionGetPermissionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetPermissionReply>(`/api/console/permission/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/permission/${param0} */
export async function PermissionUpdatePermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionUpdatePermissionParams,
  body: API.UpdatePermissionRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdatePermissionReply>(`/api/console/permission/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/permission/${param0} */
export async function PermissionDeletePermission(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.PermissionDeletePermissionParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DeletePermissionReply>(`/api/console/permission/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

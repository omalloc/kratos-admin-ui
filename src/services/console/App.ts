// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/app */
export async function AppList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AppListParams,
  options?: { [key: string]: any },
) {
  return request<API.AppListReply>('/api/console/app', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/app */
export async function AppCreate(body: API.AppInfo, options?: { [key: string]: any }) {
  return request<API.AppCreateReply>('/api/console/app', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/app/-/metas */
export async function AppNamespaceAppList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AppNamespaceAppListParams,
  options?: { [key: string]: any },
) {
  return request<API.NamespaceAppListReply>('/api/console/app/-/metas', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/app/${param0} */
export async function AppGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AppGetParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AppGetReply>(`/api/console/app/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/app/${param0} */
export async function AppUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AppUpdateParams,
  body: API.AppUpdateRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AppUpdateReply>(`/api/console/app/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/app/${param0} */
export async function AppDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.AppDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.AppDeleteReply>(`/api/console/app/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

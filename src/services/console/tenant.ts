// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 创建租户 POST /api/console/tenant */
export async function tenantCreateTenant(body: API.CreateTenantRequest, options?: { [key: string]: any }) {
  return request<API.CreateTenantReply>('/api/console/tenant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询租户 GET /api/console/tenant/${param0} */
export async function tenantGetTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TenantGetTenantParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.GetTenantReply>(`/api/console/tenant/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 更新租户 PUT /api/console/tenant/${param0} */
export async function tenantUpdateTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TenantUpdateTenantParams,
  body: API.UpdateTenantRequest,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.UpdateTenantReply>(`/api/console/tenant/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除租户 DELETE /api/console/tenant/${param0} */
export async function tenantDeleteTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TenantDeleteTenantParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.DeleteTenantReply>(`/api/console/tenant/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/tenant/${param0}/bind */
export async function tenantBindTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TenantBindTenantParams,
  body: API.BindTenantRequest,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.BindTenantReply>(`/api/console/tenant/${param0}/bind`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/tenant/${param0}/unbind */
export async function tenantUnbindTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TenantUnbindTenantParams,
  body: API.UnbindTenantRequest,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.UnbindTenantReply>(`/api/console/tenant/${param0}/unbind`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询租户列表 GET /api/console/tenants */
export async function tenantListTenant(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.TenantListTenantParams,
  options?: { [key: string]: any },
) {
  return request<API.ListTenantReply>('/api/console/tenants', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

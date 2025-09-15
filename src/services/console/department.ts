// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/dept */
export async function departmentListDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DepartmentListDepartmentParams,
  options?: { [key: string]: any },
) {
  return request<API.ListDepartmentReply>('/api/console/dept', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/dept */
export async function departmentCreateDepartment(body: API.CreateDepartmentRequest, options?: { [key: string]: any }) {
  return request<API.CreateDepartmentReply>('/api/console/dept', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/dept/${param0} */
export async function departmentGetDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DepartmentGetDepartmentParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.GetDepartmentReply>(`/api/console/dept/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/dept/${param0} */
export async function departmentUpdateDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DepartmentUpdateDepartmentParams,
  body: API.UpdateDepartmentRequest,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.UpdateDepartmentReply>(`/api/console/dept/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/dept/${param0} */
export async function departmentDeleteDepartment(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DepartmentDeleteDepartmentParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.DeleteDepartmentReply>(`/api/console/dept/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/depts */
export async function departmentListAllDepartment(options?: { [key: string]: any }) {
  return request<API.ListAllDepartmentReply>('/api/console/depts', {
    method: 'GET',
    ...(options || {}),
  });
}

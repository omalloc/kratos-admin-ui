// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/menu */
export async function menuListMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuListMenuParams,
  options?: { [key: string]: any },
) {
  return request<API.ListMenuReply>('/api/console/menu', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/menu */
export async function menuCreateMenu(body: API.CreateMenuRequest, options?: { [key: string]: any }) {
  return request<API.CreateMenuReply>('/api/console/menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/menu/${param0} */
export async function menuGetMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuGetMenuParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetMenuReply>(`/api/console/menu/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/menu/${param0} */
export async function menuUpdateMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuUpdateMenuParams,
  body: API.UpdateMenuRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdateMenuReply>(`/api/console/menu/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/menu/${param0} */
export async function menuDeleteMenu(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.MenuDeleteMenuParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DeleteMenuReply>(`/api/console/menu/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

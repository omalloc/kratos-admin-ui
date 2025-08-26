// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/crontab */
export async function crontabListCrontab(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CrontabListCrontabParams,
  options?: { [key: string]: any },
) {
  return request<API.ListCrontabReply>('/api/console/crontab', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/crontab */
export async function crontabCreateCrontab(body: API.CreateCrontabRequest, options?: { [key: string]: any }) {
  return request<API.CreateCrontabReply>('/api/console/crontab', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/crontab/${param0} */
export async function crontabGetCrontab(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CrontabGetCrontabParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.GetCrontabReply>(`/api/console/crontab/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/crontab/${param0} */
export async function crontabUpdateCrontab(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CrontabUpdateCrontabParams,
  body: API.UpdateCrontabRequest,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.UpdateCrontabReply>(`/api/console/crontab/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/console/crontab/${param0} */
export async function crontabDeleteCrontab(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CrontabDeleteCrontabParams,
  options?: { [key: string]: any },
) {
  const { uid: param0, ...queryParams } = params;
  return request<API.DeleteCrontabReply>(`/api/console/crontab/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

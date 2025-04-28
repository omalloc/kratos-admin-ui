// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/node */
export async function NodeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NodeListParams,
  options?: { [key: string]: any },
) {
  return request<API.NodeListReply>('/api/console/node', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/console/node */
export async function NodeCreate(body: API.CreateNodeRequest, options?: { [key: string]: any }) {
  return request<API.CreateNodeReply>('/api/console/node', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/node/${param0} */
export async function NodeUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.NodeUpdateParams,
  body: API.UpdateNodeRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdateNodeReply>(`/api/console/node/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

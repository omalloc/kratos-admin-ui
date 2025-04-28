// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** List returns a list of zones.

 The list is sorted by zone id. GET /api/console/zone */
export async function ZoneList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ZoneListParams,
  options?: { [key: string]: any },
) {
  return request<API.GetZoneListReply>('/api/console/zone', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create creates a new zone.

 ... POST /api/console/zone */
export async function ZoneCreate(body: API.CreateZoneRequest, options?: { [key: string]: any }) {
  return request<API.CreateZoneReply>('/api/console/zone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get returns the zone.

 Query parameter "id" is required.
 Example: /api/console/zone/1 GET /api/console/zone/${param0} */
export async function ZoneGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ZoneGetParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.GetZoneReply>(`/api/console/zone/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Update updates the zone.

 ... PUT /api/console/zone/${param0} */
export async function ZoneUpdate(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ZoneUpdateParams,
  body: API.UpdateZoneRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.UpdateZoneReply>(`/api/console/zone/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** Delete deletes the zone.

 ... DELETE /api/console/zone/${param0} */
export async function ZoneDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ZoneDeleteParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DeleteZoneReply>(`/api/console/zone/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Disable disables the zone.

 ... POST /api/console/zone/${param0}/disable */
export async function ZoneDisable(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.ZoneDisableParams,
  body: API.DisableZoneRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.DisableZoneReply>(`/api/console/zone/${param0}/disable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** SimpleList returns a simple-list of zones.

 The list is sorted by zone create time. GET /api/console/zone/simple */
export async function ZoneSimpleList(options?: { [key: string]: any }) {
  return request<API.SimpleListReply>('/api/console/zone/simple', {
    method: 'GET',
    ...(options || {}),
  });
}

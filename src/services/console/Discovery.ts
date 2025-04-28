// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/console/discovery/services/-/online */
export async function DiscoveryOnlineServices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DiscoveryOnlineServicesParams,
  options?: { [key: string]: any },
) {
  return request<API.OnlineServiceReply>('/api/console/discovery/services/-/online', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/kv/-/value */
export async function DiscoveryKVGetValue(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DiscoveryKVGetValueParams,
  options?: { [key: string]: any },
) {
  return request<API.KVGetValueReply>('/api/console/kv/-/value', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/console/kv/${param0}/hang */
export async function DiscoveryKVUpdateHang(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DiscoveryKVUpdateHangParams,
  body: API.KVUpdateHangRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.KVUpdateHangReply>(`/api/console/kv/${param0}/hang`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/kv/clusters */
export async function DiscoveryKVListClusters(options?: { [key: string]: any }) {
  return request<API.KVListClustersReply>('/api/console/kv/clusters', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/console/kv/keys */
export async function DiscoveryKVListKeys(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DiscoveryKVListKeysParams,
  options?: { [key: string]: any },
) {
  return request<API.KVListKeysReply>('/api/console/kv/keys', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

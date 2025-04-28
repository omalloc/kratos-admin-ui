// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

const traceApiRoot = '/api/traces';

export type Service = { label: string; value: string };

export async function getServices(): Promise<Array<Service>> {
  return request(`${traceApiRoot}/services`).then((res) => {
    return res?.data.map((k: any) => ({ label: k, value: k }));
  });
}

export async function getServiceOperations(serviceName: string) {
  return request(
    `${traceApiRoot}/services/${encodeURIComponent(serviceName)}/operations`,
  ).then((res) => {
    const data = res?.data.map((k: any) => ({ label: k, value: k })) || [];
    return [{ label: 'all', value: 'all' }, ...data];
  });
}

export async function getTraces(params: {
  start: number;
  end: number;
  service: string;
  operation?: string;
  tags?: string;
  lookback: string;
  limit: number;
}) {
  return request('/api/traces/traces', {
    params,
  }).then((res) => {
    console.log('getTraces', res);
    return res?.data;
  });
}

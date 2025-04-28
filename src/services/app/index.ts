import { request } from '@umijs/max';

const getApps = () => {
  return request('/api/v1/apps', {});
};

export { getApps };

import services from '@/services/console';
import { useLayoutEffect, useState } from 'react';

const { AppNamespaceAppList } = services.App;

export type AppModel = Record<string, API.NamespaceApp>;

const useAppModel = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AppModel>({});

  const getAppKey = (name?: string, namespace?: string) => {
    return `${name}_${namespace}`;
  };

  const hasAppExist = (name?: string, namespace?: string) => {
    return !!data[getAppKey(name, namespace)];
  };

  const refresh = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const { data = [] } = await AppNamespaceAppList({ name: '' });
      const result = data.reduce((acc, cur) => {
        acc[getAppKey(cur.name, cur.namespace_name)] = cur;
        return acc;
      }, {} as AppModel);
      setData(result);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    refresh();
  }, []);

  return {
    data,
    loading,
    refresh,
    getAppKey,
    hasAppExist,
  };
};

export default useAppModel;

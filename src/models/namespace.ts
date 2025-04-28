import services from '@/services/console';
import { useLayoutEffect, useMemo, useState } from 'react';

const { NamespaceSimpleList } = services.Namespace;

const useNamespaceModel = () => {
  const [loading, setLoading] = useState(false);
  // 原始 Namespace 数组
  const [data, setData] = useState<API.NamespaceSimple[]>([]);
  // id 到 name 的映射
  const idMap = useMemo(() => {
    return data.reduce(
      (pre, cur) => {
        if (cur.id) {
          pre[cur?.id] = `${cur.alias} (${cur.name})`;
        }
        return pre;
      },
      {} as Record<number, string>,
    );
  }, [data]);
  // name 到 alias 的映射
  const nameMap = useMemo(
    () =>
      data.reduce(
        (pre, cur) => {
          if (cur.name) {
            pre[cur.name] = cur.alias || '';
          }
          return pre;
        },
        {} as Record<string, string>,
      ),
    [data],
  );
  // id 到 Namespace 的映射
  const namespaceMap = useMemo(
    () =>
      data.reduce(
        (agg, next) => {
          if (next.id) {
            agg[next.id] = next;
          }
          return agg;
        },
        {} as Record<string, API.NamespaceSimple>,
      ),
    [data],
  );
  // name 到 Namespace 的映射
  const dataMap = useMemo(
    () =>
      data.reduce(
        (agg, next) => {
          if (next.name) {
            agg[next.name] = next;
          }
          return agg;
        },
        {} as Record<string, API.NamespaceSimple>,
      ),
    [data],
  );

  const refresh = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const { data = [] } = await NamespaceSimpleList();
      setData(data);
    } finally {
      setLoading(false);
    }
    return;
  };

  useLayoutEffect(() => {
    refresh();
  }, []);

  return {
    data,
    idMap,
    dataMap,
    nameMap,
    namespaceMap,
    loading,
    refresh,
  };
};

export default useNamespaceModel;

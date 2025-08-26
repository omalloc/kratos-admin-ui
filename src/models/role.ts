import * as roleService from '@/services/console/role';
import { useModel } from '@umijs/max';
import { useEffect, useMemo, useState } from 'react';

const useRoleList = () => {
  const { initialState, loading: appLoading } = useModel('@@initialState');
  const [roleMap, setRoleMap] = useState<Record<string, API.RoleInfo>>({});
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    if (!initialState?.currentUser) {
      return;
    }
    setLoading(true);

    try {
      const resp = await roleService.roleGetAll();
      if (resp.data) {
        const roleMap = resp.data.reduce<Record<string, Required<API.RoleInfo>>>((kv, item) => {
          kv[item.uid || ''] = item as Required<API.RoleInfo>;
          return kv;
        }, {});
        setRoleMap(roleMap);
      }
    } catch (error) {
      console.error('fetch global rolemap err', error);
    } finally {
      setLoading(false);
    }
  };

  const lastRole = useMemo(() => Object.values(roleMap).pop(), [roleMap]);

  useEffect(() => {
    refresh();
  }, [appLoading]);

  return {
    lastRole,
    roleMap,
    loading,
    refresh,
  };
};

export default useRoleList;

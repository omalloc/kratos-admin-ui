import * as permissionService from '@/services/console/permission';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

const usePermission = () => {
  const { initialState, loading: appLoading } = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(true);
  const [permissionMap, setPermissionMap] = useState<Record<string, API.PermissionInfo>>({});

  const load = async () => {
    const resp = await permissionService.permissionListAllPermission();
    if (resp.data) {
      return resp.data.reduce<Record<string, Required<API.PermissionInfo>>>((kv, item) => {
        kv[item.uid || ''] = item as Required<API.PermissionInfo>;
        return kv;
      }, {});
    }
    return {};
  };

  const refresh = async () => {
    if (!initialState?.currentUser) {
      return;
    }
    setLoading(true);

    try {
      const resp = await permissionService.permissionListAllPermission();
      if (resp.data) {
        const permMap = resp.data.reduce<Record<string, Required<API.PermissionInfo>>>((kv, item) => {
          kv[item.uid || ''] = item as Required<API.PermissionInfo>;
          return kv;
        }, {});
        setPermissionMap(permMap);
      }
    } catch (error) {
      console.error('fetch global permissionMap err', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [appLoading]);

  return {
    permissionMap,
    loading,
    refresh,
  };
};

export default usePermission;

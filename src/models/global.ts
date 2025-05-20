// 全局共享数据示例
import * as permissionService from '@/services/console/permission';
import { useModel } from '@umijs/max';
import { useEffect, useState } from 'react';

const useRoleList = () => {
  const { initialState } = useModel('@@initialState');
  const [permissionMap, setPermissionMap] = useState<Record<string, API.PermissionInfo>>({});

  const load = async () => {
    const resp = await permissionService.permissionListAllPermission();
    if (resp.data) {
      return resp.data.reduce<Record<string, API.PermissionInfo>>((kv, item) => {
        kv[item.id || ''] = item;
        return kv;
      }, {});
    }
    return {};
  };

  const refresh = async () => {
    const data = await load();
    setPermissionMap(data);
  };

  useEffect(() => {
    refresh();
  }, [initialState?.currentUser]);

  return {
    permissionMap,
    refresh,
  };
};

export default useRoleList;

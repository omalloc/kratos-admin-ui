// 全局共享数据示例
import * as permissionService from '@/services/console/permission';
import { useRequest } from '@umijs/max';

const useRoleList = () => {
  const { data: permissionMap = {}, refresh } = useRequest(() => permissionService.permissionListAllPermission(), {
    formatResult: (res) => {
      return res.data?.reduce<Record<string, API.PermissionInfo>>((kv, item) => {
        kv[item.id || ''] = item;
        return kv;
      }, {});
    },
  });

  return {
    permissionMap,
    refresh,
  };
};

export default useRoleList;

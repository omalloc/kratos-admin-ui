import { InitialState } from './typing';

export default (initialState: InitialState) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  // const canSeeAdmin = !!(initialState && initialState.currentUser);
  const { currentUser } = initialState;
  if (!currentUser) {
    return {
      doAction: () => true,
      routeFilter: () => true,
    };
  }

  // 合并用户角色的 permissions
  const permissions = currentUser.roles.flatMap((item: API.RoleInfo) => {
    return item.permissions;
  });

  const routeAccessMap = permissions.reduce<Record<string, { name: string; actions: string[] }>>((kv, item) => {
    if (!item) {
      return kv;
    }
    const key = item.name?.toLowerCase();
    if (!key) {
      return kv;
    }

    const { actions } = kv[key] || { actions: [] };
    kv[key] = {
      name: item.name!,
      actions: [...(item.actions?.map((action) => action?.key?.toLowerCase() || '') || []), ...actions].filter(Boolean),
    };
    return kv;
  }, {});

  return {
    doAction: (action: string) => {
      // TODO: 按钮权限,根据权限组的 action, data_access 来判断
      return true;
    },
    routeFilter: (route: any) => {
      // 放行 (redirect)
      if (route.redirect && route.redirect !== '') {
        return true;
      }

      // 放行没配置权限的路由
      const { permission = [] } = route.meta || {};
      if (permission === undefined || permission.length === 0) {
        return true;
      }

      // 如果权限不匹配，则不放行
      const matched = permission.every((key: string) => {
        if (routeAccessMap[key.toLowerCase()]) {
          return true;
        }
        return false;
      });

      return matched;
    },
  };
};

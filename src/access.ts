export default (initialState: { currentUser: API.CurrentUserReply }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  // const canSeeAdmin = !!(initialState && initialState.currentUser);

  const routeAccessMap =
    initialState.currentUser.roles?.reduce<Record<string, API.RoleInfo>>(
      (kv, item) => {
        kv[item.name!.toLowerCase()] = item;
        return kv;
      },
      {},
    ) || {};

  return {
    doAction: (action: string) => {
      // TODO: 按钮权限,根据权限组的 action, data_access 来判断
      return true;
    },
    routeFilter: (route: any) => {
      // 放行 (redirect)
      if (route.redirect !== '') {
        return true;
      }

      // 放行没配置权限的路由
      const { permission } = route.meta || {};
      if (permission) {
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

export default [
  {
    path: '/',
    name: '仪表盘',
    icon: 'icon-dashboard',
    component: './Home',
  },

  // Admin
  {
    path: '/admin',
    name: '系统管理',
    icon: 'icon-config',
    routes: [
      {
        path: '',
        redirect: '/admin/user',
      },
      {
        path: '/admin/user',
        name: '用户',
        icon: 'user',
        component: './Admin/User',
        access: 'routeFilter',
        meta: {
          permission: ['user'],
        },
      },
      {
        path: '/admin/role',
        name: '角色',
        icon: 'team',
        component: './Admin/Role',
        access: 'routeFilter',
        meta: {
          permission: ['role'],
        },
      },
      {
        path: '/admin/permission',
        name: '权限',
        icon: 'verified',
        component: './Admin/Permission',
        access: 'routeFilter',
        meta: {
          permission: ['permission'],
        },
      },
      {
        path: '/admin/menu',
        name: '菜单',
        icon: 'menu',
        component: './Admin/Menu',
        access: 'routeFilter',
        meta: {
          permission: ['menu'],
        },
      },
    ],
  },

  // 测试
  {
    path: '/test',
    name: '测试',
    icon: 'icon-dashboard',
    component: './404',
  },

  // Passport
  {
    path: '/passport',
    component: './Passport',
    layout: false,
    routes: [
      {
        name: '用户登录',
        path: '/passport/login',
        component: './Passport/Login',
      },
      {
        name: '用户注册',
        path: '/passport/register',
        component: './Passport/Register',
      },
      {
        name: '重置密码',
        path: '/passport/reset-password',
        component: './Passport/ResetPassword',
      },
    ],
  },

  {
    path: '*',
    layout: false,
    component: './404',
  },
];

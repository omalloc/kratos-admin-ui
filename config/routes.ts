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
    access: 'routeFilter',
    meta: {
      permission: ['system'],
    },
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
      {
        path: '/admin/crontab',
        name: '定时任务',
        icon: 'schedule',
        component: './Admin/Crontab',
        access: 'routeFilter',
        meta: {
          permission: ['crontab'],
        },
      },
    ],
  },

  {
    path: '/todo',
    name: '待办事项',
    icon: 'icon-dashboard',
    component: './Todo',
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
    path: '/account',
    hideInMenu: true,
    routes: [
      {
        path: '/account/setting',
        name: '设置',
        component: './Account/Setting',
      },
    ],
  },

  {
    path: '*',
    layout: false,
    component: './404',
  },
];

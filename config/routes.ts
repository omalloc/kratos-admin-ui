export default [
  {
    path: '/',
    name: '仪表盘',
    icon: 'icon-dashboard',
    component: './Welcome',
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
        path: '/admin/dept',
        name: '部门',
        icon: 'cluster',
        component: './Admin/Department',
        access: 'routeFilter',
        meta: {
          permission: [], //department
        },
      },
      {
        path: '/admin/tenant',
        name: '租户',
        icon: 'apartment',
        component: './Admin/Tenant',
        access: 'routeFilter',
        meta: {
          permission: ['tenant'],
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
    icon: 'icon-star',
    component: './Todo',
  },
  {
    path: '/posts',
    name: '文章',
    icon: 'icon-star',
    component: './Posts',
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

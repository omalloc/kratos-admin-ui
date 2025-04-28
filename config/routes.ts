export default [
  {
    path: '/',
    name: '仪表盘',
    icon: 'icon-dashboard',
    component: './Home',
  },

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
      },
      {
        path: '/admin/role',
        name: '角色',
        icon: 'team',
        component: './Admin/Role',
      },
      {
        path: '/admin/permission',
        name: '权限',
        icon: 'verified',
        component: './Admin/Permission',
      },
    ],
  },
];

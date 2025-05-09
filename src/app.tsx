import { RunTimeLayoutConfig, type RequestConfig } from '@umijs/max';
import { App } from 'antd';
// 运行时配置

export const request: RequestConfig = {
  timeout: 6000,
  // other axios options you want
  errorConfig: {
    errorHandler() {
      // message.error(errs.message);
    },
    errorThrower() {},
  },
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  ],
  responseInterceptors: [
    (response: any) => {
      // const { data } = response;
      // if (response.status <= 206) {
      //   return data;
      // }
      return response;
    },
  ],
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  collapsed: boolean;
  currentUser: API.UserInfo;
  token: string;
}> {
  const token = localStorage.getItem('token');
  if (token) {
    // const user = await getUserInfo();
    return { collapsed: false, currentUser: {}, token };
  }
  return { collapsed: false, currentUser: {}, token: '' };
}
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    logo: '/logo.svg',
    title: '',
    layout: 'mix',
    navTheme: 'light', // 'realDark', // 'light',
    // colorPrimary: '#2F54EB',
    splitMenus: true,
    fixedHeader: true,
    fixSiderbar: true,
    collapsed: initialState?.collapsed,
    onCollapse: (collapsed: boolean) => {
      console.log('onCollapse', collapsed);
      setInitialState({ ...initialState, collapsed: collapsed });
    },
    // collapsedWidth: 80,
    collapsedButtonRender: false,
    siderWidth: 180, // ignored prop.
    contentWidth: 'Fluid',
    iconfontUrl: '//at.alicdn.com/t/c/font_4221036_c2wl4klxsj.js',
    menu: {
      locale: false,
      // type: 'group',
      // collapsedShowTitle: true,
    },
    token: {
      // sider: {
      //   colorMenuBackground: '#fff',
      //   colorMenuItemDivider: '#dfdfdf',
      //   colorBgMenuItemHover: '#f6f6f6',
      //   colorTextMenu: '#595959',
      //   colorTextMenuSelected: '#242424',
      //   colorTextMenuActive: '#242424',
      // },
    },
    appList: [],
    childrenRender(dom) {
      return <App>{dom}</App>;
    },
  };
};

import { passportAuthorizeMenu, passportCurrentUser } from '@/services/console/passport';
import { history, RunTimeLayoutConfig, type RequestConfig } from '@umijs/max';
import { App } from 'antd';
import RightContent from './components/RightContent';
import { APP_TOKEN_KEY } from './constants';
import { CurrentUser, InitialState } from './typing';
import { listToTree } from './utils/menu';

// 运行时配置
export const request: RequestConfig = {
  timeout: 6000,
  // other axios options you want
  requestInterceptors: [
    (config: any) => {
      const token = localStorage.getItem(APP_TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  ],
  responseInterceptors: [
    (response: any) => {
      return response;
    },
  ],
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<InitialState> {
  const token = localStorage.getItem(APP_TOKEN_KEY);

  try {
    if (token) {
      const user = await passportCurrentUser({});
      const currentUser = {
        user: user.user,
        roles: user.roles,
      } as CurrentUser;

      const logout = async () => {
        localStorage.removeItem(APP_TOKEN_KEY);
        history.push('/passport/login');
      };

      return {
        collapsed: false,
        currentUser,
        token,
        settings: { theme: 'light' },
        logout,
      };
    }

    throw new Error('token is empty');
  } catch (error) {
    // token 到期了，需要重新登录
    localStorage.removeItem(APP_TOKEN_KEY);
    history.push('/passport/login');
    return {
      currentUser: undefined,
      collapsed: false,
      token: '',
      settings: { theme: 'light' },
      logout: async () => {},
    };
  }
}

export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    logo: '/logo.svg',
    title: '',
    layout: 'mix',
    navTheme: initialState?.settings.theme,
    // colorPrimary: '#2F54EB',
    splitMenus: true,
    fixedHeader: true,
    fixSiderbar: true,
    collapsed: initialState?.collapsed,
    onCollapse: (collapsed: boolean) => {
      setInitialState((state: any) => ({ ...state, collapsed }));
    },
    collapsedButtonRender: false,
    siderWidth: 180, // ignored prop.
    contentWidth: 'Fluid',
    iconfontUrl: '//at.alicdn.com/t/c/font_4221036_w49cm25y52.js',
    menu: {
      locale: false,
      params: {
        userId: initialState?.currentUser?.user.id,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        const res = await passportAuthorizeMenu({});
        return listToTree(res.data);
      },
    },
    token: {},
    appList: [],
    rightContentRender: () => <RightContent style={{ marginRight: '12px' }} />,
    childrenRender(dom) {
      return <App>{dom}</App>;
    },
  };
};

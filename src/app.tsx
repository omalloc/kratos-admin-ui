import { passportCurrentUser } from '@/services/console/passport';
import { history, RunTimeLayoutConfig, type RequestConfig } from '@umijs/max';
import { App } from 'antd';
import dayjs from 'dayjs';
import zhCN from 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import RightContent from './components/RightContent';
import { APP_TOKEN_KEY } from './constants';
import { CurrentUser, InitialState } from './typing';
import { listToTree } from './utils/menu';

dayjs.locale(zhCN);
dayjs.extend(relativeTime);

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
  errorConfig: {
    // 错误抛出
    errorThrower: (res: any) => {
      const { success, data, errorCode, errorMessage, showType } = res;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error;
      }
    },
    // 错误处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: any = error.info;
        if (errorInfo.errorMessage) {
          // 这里可以添加全局的错误提示
          console.error('请求错误:', errorInfo.errorMessage);
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        const errorData = error.response.data;
        if (errorData?.message) {
          console.error('响应错误:', errorData.message);
        } else {
          console.error('响应错误:', error.response.status, error.response.data);
        }
        if (error.response.status === 401) {
          // 401 需要登录
          localStorage.removeItem(APP_TOKEN_KEY);
          history.push('/passport/login');
        }
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        console.error('请求错误:', error.request);
      } else {
        // 发送请求时出了点问题
        console.error('请求配置错误:', error.message);
      }
    },
  },
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
        allow_menus: user.allow_menus,
      } as CurrentUser;

      const logout = async () => {
        localStorage.removeItem(APP_TOKEN_KEY);
        history.push('/passport/login');
      };

      return {
        collapsed: false,
        currentUser,
        token,
        settings: { theme: 'light', colorPrimary: '#8bbb11' },
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
      settings: { theme: 'light', colorPrimary: '#8bbb11' },
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
    colorPrimary: initialState?.settings.colorPrimary,
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
        userId: initialState?.currentUser?.user.uid,
      },
      request: async (params, defaultMenuData) => {
        // initialState.currentUser 中包含了所有用户信息
        // const { allow_menus } = await passportCurrentUser({});
        return listToTree(initialState?.currentUser?.allow_menus || []);
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

export function rootContainer(container: React.ReactNode) {
  return <App>{container}</App>;
}

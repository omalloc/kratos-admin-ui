import { APP_TOKEN_KEY } from '@/constants';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Spin } from 'antd';
import { createStyles } from 'antd-style';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from './HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const useStyles = createStyles(({ token }) => {
  return {
    name: {
      width: '70px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none',
      },
    },
    avatar: {
      marginRight: '8px',
      color: '#FFF',
      verticalAlign: 'top',
      // background: setAlpha(token.colorBgContainer, 0.85),
      backgroundColor: token.colorPrimary,
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    },
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

const Name: React.FC<{ nickname: string }> = ({ nickname }) => {
  const { styles, cx } = useStyles();

  return <span className={cx('anticon', styles.name)}>{nickname}</span>;
};

const AvatarLogo: React.FC<{ nickname: string }> = ({ nickname }) => {
  const { styles } = useStyles();

  return (
    <Avatar size="small" className={styles.avatar} alt="avatar">
      {nickname.charAt(0).toUpperCase()}
    </Avatar>
  );
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { styles } = useStyles();
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await initialState?.logout?.();

    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/passport/login' && !redirect) {
      history.replace({
        pathname: '/passport/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        flushSync(() => {
          localStorage.removeItem(APP_TOKEN_KEY);
          setInitialState((state: any) => ({
            ...state,
            currentUser: undefined,
          }));
        });
        loginOut();
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.user.username) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'my',
            icon: <SettingOutlined />,
            label: '个人中心',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const nickname = currentUser?.user.nickname || currentUser?.user.username || '无';

  return (
    <HeaderDropdown
      placement="topRight"
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      <span className={styles.action}>
        <AvatarLogo nickname={nickname} />
        <Name nickname={nickname} />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;

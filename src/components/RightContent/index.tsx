import { MoonOutlined, QuestionCircleOutlined, SunOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { createStyles } from 'antd-style';
import React, { type CSSProperties } from 'react';
import { FontIcon } from '../IconSelect';
import Avatar from './AvatarDropdown';
import HeaderDropdown from './HeaderDropdown';

const useStyles = createStyles(({ token }) => ({
  root: {
    display: 'flex',
    height: '48px',
    marginLeft: 'auto',
    overflow: 'hidden',
    gap: 8,
  },
  action: {
    display: 'flex',
    float: 'right',
    height: '48px',
    marginLeft: 'auto',
    overflow: 'hidden',
    cursor: 'pointer',
    padding: '0 12px',
    borderRadius: token.borderRadius,
    '&:hover': {
      backgroundColor: token.colorBgTextHover,
    },
  },
}));

const GlobalHeaderRight: React.FC<{ style?: CSSProperties }> = (props) => {
  const { styles } = useStyles();

  const { initialState, setInitialState } = useModel('@@initialState');

  if (!initialState) {
    return null;
  }

  return (
    <div className={styles.root} {...props}>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://github.com/omalloc/kratos-admin-ui');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      <span
        className={styles.action}
        onClick={() =>
          setInitialState((state: any) => ({
            ...state,
            settings: {
              ...state?.settings,
              theme: initialState?.settings?.theme === 'light' ? 'realDark' : 'light',
            },
          }))
        }
      >
        {initialState?.settings?.theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
      </span>
      <HeaderDropdown
        placement="topRight"
        menu={{
          selectedKeys: [],
          onClick: (event) => {
            console.log('onClick event', event);
            setInitialState((state: any) => ({
              ...state,
              settings: {
                ...state?.settings,
                colorPrimary: event.key,
              },
            }));
          },
          items: [
            {
              key: '#f5222d',
              label: 'Dust Red',
            },
            {
              key: '#ff7a45',
              label: 'Volcano',
            },
            {
              key: '#ffa940',
              label: 'Sunset Orange',
            },
            {
              key: '#36cfc9',
              label: 'Cyan',
            },
            {
              key: '#73d13d',
              label: 'Polar Green',
            },
            {
              key: '#597ef7',
              label: 'Geek Blue',
            },
            {
              key: '#9254de',
              label: 'Golden Purple',
            },
          ],
        }}
      >
        <span className={styles.action}>
          <FontIcon type="icon-theme" style={{ fontSize: 16 }} />
        </span>
      </HeaderDropdown>
      <Avatar menu={true} />
    </div>
  );
};
export default GlobalHeaderRight;

export type SiderTheme = 'light' | 'dark';

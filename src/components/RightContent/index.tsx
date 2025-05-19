import { MoonOutlined, QuestionCircleOutlined, SunOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { createStyles } from 'antd-style';
import React, { type CSSProperties } from 'react';
import Avatar from './AvatarDropdown';

export type SiderTheme = 'light' | 'dark';

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
      <Avatar menu={true} />
    </div>
  );
};
export default GlobalHeaderRight;

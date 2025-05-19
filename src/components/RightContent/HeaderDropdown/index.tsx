import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import type { DropDownProps } from 'antd/es/dropdown';
import React from 'react';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

const useStyles = createStyles(({ token }) => {
  return {
    root: {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%',
      },
    },
  };
});

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const { styles } = useStyles();
  return (
    <Dropdown
      overlayClassName={styles.root}
      getPopupContainer={(target) => target.parentElement || document.body}
      {...restProps}
    />
  );
};

export default HeaderDropdown;

export type CurrentUser = {
  user: Required<API.UserInfo>;
  roles: Required<API.RoleInfo[]>;
  configs: Record<string, string>;
  allow_menus?: Required<API.MenuInfo[]>;
};

export type InitialState = {
  token: string;
  collapsed: boolean;
  settings: {
    theme: 'light' | 'realDark' | undefined;
    colorPrimary: string | undefined;
  };
  currentUser?: CurrentUser;
  logout: () => Promise<void>;
};

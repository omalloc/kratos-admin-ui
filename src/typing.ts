export type CurrentUser = {
  user: Required<API.UserInfo>;
  roles: Required<API.RoleInfo[]>;
};

export type InitialState = {
  token: string;
  collapsed: boolean;
  settings: {
    theme: 'light' | 'realDark' | undefined;
  };
  currentUser?: CurrentUser;
  logout: () => Promise<void>;
};

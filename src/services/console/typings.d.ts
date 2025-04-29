declare namespace API {
  type Action = {
    key?: string;
    describe?: string;
    checked?: boolean;
  };

  type BindPermissionReply = {};

  type BindPermissionRequest = {
    id?: string;
    permission_id?: string;
    actions?: Action[];
    data_access?: Action[];
  };

  type BindRoleReply = {};

  type BindRoleRequest = {
    id?: string;
    role_id?: string;
  };

  type CreatePermissionReply = {};

  type CreatePermissionRequest = {
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type CreateRoleReply = {};

  type CreateRoleRequest = {
    name?: string;
    describe?: string;
    status?: number;
  };

  type CreateUserReply = {
    id?: string;
  };

  type CreateUserRequest = {
    username?: string;
    password?: string;
    re_password?: string;
    email?: string;
    nickname?: string;
    role_id?: string;
    omit_perm?: string[];
  };

  type DeletePermissionReply = {};

  type DeleteRoleReply = {};

  type DeleteUserReply = {};

  type GetPermissionReply = {
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type GetRoleReply = {
    id?: string;
    name?: string;
    alias?: string;
    describe?: string;
    status?: number;
    permissions?: RolePermission[];
    actions?: Action[];
    data_access?: Action[];
  };

  type GetUserReply = {
    user?: UserInfo;
    roles?: RoleInfo[];
  };

  type ListAllPermissionReply = {
    data?: PermissionInfo[];
  };

  type ListPermissionReply = {
    data?: PermissionInfo[];
    pagination?: Pagination;
  };

  type ListRoleReply = {
    pagination?: Pagination;
    data?: RoleInfo[];
  };

  type ListUserReply = {
    pagination?: Pagination;
    data?: UserInfo[];
  };

  type Pagination = {
    current?: number;
    page_size?: number;
    total?: number;
    raw_total?: string;
  };

  type PermissionDeletePermissionParams = {
    id: string;
  };

  type PermissionGetPermissionParams = {
    id: string;
  };

  type PermissionInfo = {
    id?: string;
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type PermissionListPermissionParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
    name?: string;
    alias?: string;
    status?: number;
  };

  type PermissionUpdatePermissionParams = {
    id: string;
  };

  type RoleBindPermissionParams = {
    id: string;
  };

  type RoleDeleteRoleParams = {
    id: string;
  };

  type RoleGetRoleParams = {
    id: string;
  };

  type RoleInfo = {
    id?: string;
    name?: string;
    alias?: string;
    describe?: string;
    status?: number;
    permissions?: RolePermission[];
  };

  type RoleListRoleParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
  };

  type RolePermission = {
    id?: string;
    role_id?: string;
    perm_id?: string;
    actions?: Action[];
    data_access?: Action[];
  };

  type RoleUnbindPermissionParams = {
    id: string;
    permission_id: string;
  };

  type RoleUpdateRoleParams = {
    id: string;
  };

  type UnbindPermissionReply = {};

  type UnbindPermissionRequest = {
    id?: string;
    permission_id?: string;
  };

  type UnbindRoleReply = {};

  type UpdatePermissionReply = {};

  type UpdatePermissionRequest = {
    id?: string;
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type UpdateRoleReply = {};

  type UpdateRoleRequest = {
    id?: string;
    name?: string;
    describe?: string;
    status?: number;
  };

  type UpdateUserReply = {};

  type UpdateUserRequest = {
    id?: string;
    email?: string;
    nickname?: string;
    password?: string;
    re_password?: string;
    status?: number;
  };

  type UserBindRoleParams = {
    id: string;
  };

  type UserDeleteUserParams = {
    id: string;
  };

  type UserGetUserParams = {
    id: string;
  };

  type UserInfo = {
    id?: string;
    username?: string;
    email?: string;
    nickname?: string;
    avatar?: string;
    status?: number;
    created_at?: string;
    updated_at?: string;
    role_ids?: number[];
  };

  type UserListUserParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
  };

  type UserUnbindRoleParams = {
    id: string;
    role_id: string;
  };

  type UserUpdateUserParams = {
    id: string;
  };
}

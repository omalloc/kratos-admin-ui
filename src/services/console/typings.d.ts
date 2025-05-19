declare namespace API {
  type Action = {
    key?: string;
    describe?: string;
    checked?: boolean;
  };

  type BindPermissionReply = {};

  type BindPermissionRequest = {
    id?: string;
    data?: BindPermissionRequestBindPermissionBody[];
  };

  type BindPermissionRequestBindPermissionBody = {
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
    alias?: string;
  };

  type CreateUserReply = {
    id?: string;
  };

  type CreateUserRequest = {
    username?: string;
    nickname?: string;
    email?: string;
    password?: string;
    re_password?: string;
    disabled?: boolean;
    role_ids?: string[];
  };

  type CurrentUserReply = {
    user?: UserInfo;
    roles?: RoleInfo[];
  };

  type DeletePermissionReply = {};

  type DeleteRoleReply = {};

  type DeleteUserReply = {};

  type GetAllReply = {
    data?: RoleInfo[];
  };

  type GetPermissionReply = {
    id?: string;
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

  type LoginReply = {};

  type LoginRequest = {
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 自动登录 */
    auto_login?: boolean;
  };

  type LogoutReply = {};

  type LogoutRequest = {};

  type Pagination = {
    page?: number;
    page_size?: number;
    total?: number;
  };

  type PassportUpdateUsernameParams = {
    id: string;
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
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    name?: string;
    alias?: string;
    status?: number;
  };

  type PermissionUpdatePermissionParams = {
    id: string;
  };

  type RegisterReply = {};

  type RegisterRequest = {
    /** 用户名 */
    username?: string;
    /** 昵称 */
    nickname?: string;
    /** 密码 */
    password?: string;
    /** 邮箱 */
    email?: string;
    /** 验证码 */
    captcha?: string;
  };

  type ResetPasswordReply = {};

  type ResetPasswordRequest = {
    /** 重置密码令牌 */
    token?: string;
    /** 邮箱 */
    email?: string;
    /** 密码 */
    password?: string;
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
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
  };

  type RolePermission = {
    /** 业务id */
    id?: string;
    /** 角色id */
    role_id?: string;
    /** 权限id */
    perm_id?: string;
    /** 操作权限 */
    actions?: Action[];
    /** 数据权限 */
    data_access?: Action[];
    /** 绑定权限时间 */
    created_at?: string;
  };

  type RoleUnbindPermissionParams = {
    id: string;
    permission_id: string;
  };

  type RoleUpdateRoleParams = {
    id: string;
  };

  type SendCaptchaReply = {};

  type SendCaptchaRequest = {
    type?: number;
    from?: string;
  };

  type SendResetPasswordCaptchaReply = {};

  type SendResetPasswordCaptchaRequest = {
    email?: string;
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

  type UpdateProfileReply = {};

  type UpdateProfileRequest = {
    nickname?: string;
    bio?: string;
    avatar?: string;
  };

  type UpdateRoleReply = {};

  type UpdateRoleRequest = {
    id?: string;
    name?: string;
    describe?: string;
    status?: number;
    alias?: string;
  };

  type UpdateUsernameReply = {};

  type UpdateUsernameRequest = {
    id?: string;
    username?: string;
  };

  type UpdateUserReply = {};

  type UpdateUserRequest = {
    id?: string;
    email?: string;
    nickname?: string;
    password?: string;
    re_password?: string;
    status?: number;
    role_ids?: string[];
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
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
  };

  type UserUnbindRoleParams = {
    id: string;
    role_id: string;
  };

  type UserUpdateUserParams = {
    id: string;
  };
}

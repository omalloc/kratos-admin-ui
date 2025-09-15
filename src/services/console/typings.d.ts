declare namespace API {
  type Action = {
    key?: string;
    describe?: string;
    checked?: boolean;
  };

  type AuthorizeMenuReply = {
    data?: MenuInfo[];
  };

  type BindPermissionReply = {};

  type BindPermissionRequest = {
    uid?: string;
    data?: BindPermissionRequestBindPermissionBody[];
  };

  type BindPermissionRequestBindPermissionBody = {
    permission_id?: string;
    actions?: Action[];
    data_access?: Action[];
  };

  type BindRoleReply = {};

  type BindRoleRequest = {
    uid?: string;
    role_id?: string;
  };

  type BindTenantReply = {};

  type BindTenantRequest = {
    uid?: string;
  };

  type CreateCrontabReply = {};

  type CreateCrontabRequest = {
    /** 任务名称 */
    name?: string;
    /** 任务表达式 */
    expr?: string;
    /** 任务动作 */
    action?: string;
    /** 任务描述 */
    describe?: string;
  };

  type CreateDepartmentReply = {};

  type CreateDepartmentRequest = {
    pid?: string;
    owner_id?: string;
    name?: string;
    code?: string;
    describe?: string;
    level?: number;
    status?: number;
  };

  type CreateMenuReply = {
    uid?: string;
  };

  type CreateMenuRequest = {
    pid?: string;
    permission_id?: string;
    name?: string;
    icon?: string;
    path?: string;
    sort_by?: string;
    hidden?: boolean;
    status?: number;
  };

  type CreatePermissionReply = {};

  type CreatePermissionRequest = {
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type CreatePostReply = {
    post_id?: string;
  };

  type CreatePostRequest = {
    title?: string;
    body?: string;
    tags?: string[];
    type?: number;
    status?: number;
  };

  type CreateRoleReply = {};

  type CreateRoleRequest = {
    name?: string;
    describe?: string;
    status?: number;
    alias?: string;
  };

  type CreateTenantReply = {};

  type CreateTenantRequest = {
    name?: string;
    alias?: string;
    describe?: string;
  };

  type CreateUserReply = {
    uid?: string;
  };

  type CreateUserRequest = {
    username?: string;
    nickname?: string;
    email?: string;
    password?: string;
    re_password?: string;
    status?: number;
    role_ids?: string[];
  };

  type CrontabDeleteCrontabParams = {
    uid: string;
  };

  type CrontabGetCrontabParams = {
    uid: string;
  };

  type CrontabInfo = {
    uid?: string;
    /** 任务名称 */
    name?: string;
    /** 任务表达式 */
    expr?: string;
    /** 任务动作 */
    action?: string;
    /** 任务描述 */
    describe?: string;
    /** 上次执行时间 */
    last_run_at?: string;
    created_at?: string;
    updated_at?: string;
  };

  type CrontabListCrontabParams = {
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
  };

  type CrontabUpdateCrontabParams = {
    uid: string;
  };

  type CurrentUserReply = {
    user?: UserInfo;
    configs?: Record<string, any>;
    roles?: RoleInfo[];
    allow_menus?: MenuInfo[];
  };

  type DeleteCrontabReply = {};

  type DeleteDepartmentReply = {};

  type DeleteMenuReply = {};

  type DeletePermissionReply = {};

  type DeletePostReply = {};

  type DeleteRoleReply = {};

  type DeleteTenantReply = {};

  type DeleteUserReply = {};

  type DepartmentDeleteDepartmentParams = {
    uid: string;
  };

  type DepartmentGetDepartmentParams = {
    uid: string;
  };

  type DepartmentInfo = {
    uid?: string;
    pid?: string;
    owner_id?: string;
    name?: string;
    code?: string;
    describe?: string;
    level?: number;
    status?: number;
    created_at?: string;
    updated_at?: string;
  };

  type DepartmentListDepartmentParams = {
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    status?: number;
    name?: string;
  };

  type DepartmentUpdateDepartmentParams = {
    uid: string;
  };

  type GetAllReply = {
    data?: RoleInfo[];
  };

  type GetCrontabReply = {
    data?: CrontabInfo;
  };

  type GetDepartmentReply = {
    data?: DepartmentInfo;
  };

  type GetMenuReply = {
    data?: MenuInfo;
  };

  type GetPermissionReply = {
    uid?: string;
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type GetPostReply = {
    data?: PostInfo;
  };

  type GetRoleReply = {
    uid?: string;
    name?: string;
    alias?: string;
    describe?: string;
    status?: number;
    permissions?: RolePermission[];
    actions?: Action[];
    data_access?: Action[];
  };

  type GetTenantReply = {
    data?: TenantInfo;
  };

  type GetUserReply = {
    user?: UserInfo;
    roles?: RoleInfo[];
  };

  type ListAllDepartmentReply = {
    data?: DepartmentInfo[];
  };

  type ListAllPermissionReply = {
    data?: PermissionInfo[];
  };

  type ListCrontabReply = {
    pagination?: Pagination;
    data?: CrontabInfo[];
  };

  type ListDepartmentReply = {
    pagination?: Pagination;
    data?: DepartmentInfo[];
  };

  type ListMenuReply = {
    data?: MenuInfo[];
    pagination?: Pagination;
  };

  type ListPermissionReply = {
    data?: PermissionInfo[];
    pagination?: Pagination;
  };

  type ListPostReply = {
    pagination?: Pagination;
    data?: PostInfo[];
  };

  type ListRoleReply = {
    pagination?: Pagination;
    data?: RoleInfo[];
  };

  type ListTenantReply = {
    pagination?: Pagination;
    data?: TenantInfo[];
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

  type MenuDeleteMenuParams = {
    uid: string;
  };

  type MenuGetMenuParams = {
    uid: string;
  };

  type MenuInfo = {
    uid?: string;
    pid?: string;
    permission_id?: string;
    name?: string;
    icon?: string;
    path?: string;
    sort_by?: string;
    hidden?: boolean;
    status?: number;
    created_at?: string;
    updated_at?: string;
  };

  type MenuListMenuParams = {
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    name?: string;
    status?: number;
  };

  type MenuUpdateMenuParams = {
    uid: string;
  };

  type Pagination = {
    page?: number;
    page_size?: number;
    total?: number;
  };

  type PassportAuthorizeMenuParams = {
    user_id?: string;
  };

  type PassportUpdateUsernameParams = {
    id: string;
  };

  type PermissionDeletePermissionParams = {
    uid: string;
  };

  type PermissionGetPermissionParams = {
    uid: string;
  };

  type PermissionInfo = {
    uid?: string;
    name?: string;
    alias?: string;
    describe?: string;
    allow_delete?: boolean;
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
    uid: string;
  };

  type PostDeletePostParams = {
    post_id: string;
  };

  type PostGetPostParams = {
    post_id: string;
  };

  type PostInfo = {
    id?: string;
    post_id?: string;
    title?: string;
    body?: string;
    tags?: string[];
    type?: number;
    status?: number;
    created_by?: string;
    updated_by?: string[];
    created_at?: string;
    updated_at?: string;
  };

  type PostListPostParams = {
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    status?: number;
    title?: string;
  };

  type PostUpdatePostParams = {
    post_id: string;
  };

  type RefreshTokenReply = {};

  type RefreshTokenRequest = {};

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
    uid: string;
  };

  type RoleDeleteRoleParams = {
    uid: string;
  };

  type RoleGetRoleParams = {
    uid: string;
  };

  type RoleInfo = {
    uid?: string;
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
    /** 角色id */
    role_id?: string;
    /** 权限id */
    perm_id?: string;
    /** 权限名称 */
    name?: string;
    /** 操作权限 */
    actions?: Action[];
    /** 数据权限 */
    data_access?: Action[];
    /** 绑定权限时间 */
    created_at?: string;
  };

  type RoleUnbindPermissionParams = {
    uid: string;
    permission_id: string;
  };

  type RoleUpdateRoleParams = {
    uid: string;
  };

  type SaveConfigReply = {};

  type SaveConfigRequest = {
    key?: string;
    value?: string;
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

  type TenantBindTenantParams = {
    uid: string;
  };

  type TenantDeleteTenantParams = {
    uid: string;
  };

  type TenantGetTenantParams = {
    uid: string;
  };

  type TenantInfo = {
    id?: string;
    uid?: string;
    name?: string;
    alias?: string;
    describe?: string;
    created_at?: string;
    updated_at?: string;
    allow_deleted?: boolean;
  };

  type TenantListTenantParams = {
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    name?: string;
  };

  type TenantUnbindTenantParams = {
    uid: string;
  };

  type TenantUpdateTenantParams = {
    uid: string;
  };

  type UnbindPermissionReply = {};

  type UnbindPermissionRequest = {
    uid?: string;
    permission_id?: string;
  };

  type UnbindRoleReply = {};

  type UnbindTenantReply = {};

  type UnbindTenantRequest = {
    uid?: string;
  };

  type UpdateCrontabReply = {};

  type UpdateCrontabRequest = {
    uid?: string;
    /** 任务名称 */
    name?: string;
    /** 任务表达式 */
    expr?: string;
    /** 任务动作 */
    action?: string;
    /** 任务描述 */
    describe?: string;
  };

  type UpdateDepartmentReply = {};

  type UpdateDepartmentRequest = {
    uid?: string;
    pid?: string;
    owner_id?: string;
    name?: string;
    code?: string;
    describe?: string;
    level?: number;
    status?: number;
  };

  type UpdateMenuReply = {};

  type UpdateMenuRequest = {
    uid?: string;
    pid?: string;
    permission_id?: string;
    name?: string;
    icon?: string;
    path?: string;
    sort_by?: string;
    hidden?: boolean;
    status?: number;
  };

  type UpdatePermissionReply = {};

  type UpdatePermissionRequest = {
    uid?: string;
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type UpdatePostReply = {};

  type UpdatePostRequest = {
    post_id?: string;
    title?: string;
    body?: string;
    tags?: string[];
    type?: number;
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
    uid?: string;
    name?: string;
    describe?: string;
    status?: number;
    alias?: string;
  };

  type UpdateTenantReply = {};

  type UpdateTenantRequest = {
    uid?: string;
    name?: string;
    alias?: string;
    describe?: string;
  };

  type UpdateUsernameReply = {};

  type UpdateUsernameRequest = {
    id?: string;
    username?: string;
  };

  type UpdateUserReply = {};

  type UpdateUserRequest = {
    uid?: string;
    email?: string;
    username?: string;
    nickname?: string;
    password?: string;
    re_password?: string;
    status?: number;
    role_ids?: string[];
  };

  type UserBindRoleParams = {
    uid: string;
  };

  type UserDeleteUserParams = {
    uid: string;
  };

  type UserGetUserParams = {
    uid: string;
  };

  type UserInfo = {
    uid?: string;
    username?: string;
    email?: string;
    nickname?: string;
    avatar?: string;
    status?: number;
    created_at?: string;
    updated_at?: string;
    last_login?: string;
    role_ids?: string[];
  };

  type UserListUserParams = {
    'pagination.page'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    status?: number;
    username?: string;
    email?: string;
  };

  type UserUnbindRoleParams = {
    uid: string;
    role_id: string;
  };

  type UserUpdateUserParams = {
    uid: string;
  };
}

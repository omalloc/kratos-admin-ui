declare namespace API {
  type Action = {
    key?: string;
    describe?: string;
    checked?: boolean;
  };

  type Agent = {
    /** 部署状态 */
    type?: number;
    /** 上次心跳时间 */
    heartbeat_time?: string;
    /** Agent版本 */
    version?: string;
  };

  type AppCreateReply = {
    data?: AppInfo;
  };

  type AppDeleteParams = {
    id: string;
  };

  type AppDeleteReply = {};

  type AppGetParams = {
    id: string;
  };

  type AppGetReply = {
    data?: AppInfo;
  };

  type AppInfo = {
    /** 唯一键 */
    id?: string;
    /** 应用名称 */
    name?: string;
    /** 应用别名 */
    alias?: string;
    /** 应用描述 */
    description?: string;
    /** 应用图标 */
    icon?: string;
    /** 应用端口 */
    ports?: AppInfoAppPort[];
    /** 应用类型 */
    type?: number;
    /** 命名空间id */
    namespace_id?: string;
    /** 应用负责人 */
    users?: string[];
    /** 应用仓库 */
    repos?: string[];
    /** 创建时间 */
    created_at?: string;
    /** 修改时间 */
    updated_at?: string;
  };

  type AppInfoAppPort = {
    /** 端口 0代表随机端口 */
    port?: number;
    /** 协议 */
    protocol?: number;
    /** 备注 */
    remark?: string;
  };

  type AppListParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
    /** 命名空间ID */
    namespace_id?: string;
    /** 应用名称 */
    name?: string;
  };

  type AppListReply = {
    pagination?: Pagination;
    data?: AppInfo[];
  };

  type AppNamespaceAppListParams = {
    name?: string;
  };

  type AppUpdateParams = {
    id: string;
  };

  type AppUpdateReply = {
    data?: AppInfo;
  };

  type AppUpdateRequest = {
    id?: string;
  };

  type BindNamespaceReply = {};

  type BindNamespaceRequest = {
    id?: string;
    namespace_id?: string;
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

  type CreateNodeReply = {
    data?: NodeInfo;
  };

  type CreateNodeRequest = {
    /** 节点名称 */
    name?: string;
    /** 节点IP */
    ip?: string;
    /** Agent自动上报开关 */
    auto_detect?: boolean;
    /** 可用区ID */
    zone_id?: number;
    /** 环境变量 */
    env?: string;
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

  type CreateUserReply = {};

  type CreateUserRequest = {
    username?: string;
    password?: string;
    re_password?: string;
    email?: string;
    nickname?: string;
    role_id?: string;
    omit_perm?: string[];
  };

  type CreateZoneReply = {
    /** 可用区 */
    data?: ZoneInfo;
  };

  type CreateZoneRequest = {
    /** 可用区名称 */
    name?: string;
    /** 可用区代码 */
    code?: string;
    /** 地区名称 */
    region_name?: string;
    /** 地区代码 */
    region_code?: string;
    /** 环境 */
    env?: string;
  };

  type DeletePermissionReply = {};

  type DeleteRoleReply = {};

  type DeleteUserReply = {};

  type DeleteZoneReply = {};

  type DisableZoneReply = {};

  type DisableZoneRequest = {
    /** 可用区ID */
    id?: number;
    /** 备注 */
    remark?: string;
  };

  type DiscoveryKVGetValueParams = {
    key?: string;
    cluster?: string;
  };

  type DiscoveryKVListKeysParams = {
    cluster?: string;
  };

  type DiscoveryKVUpdateHangParams = {
    /** 主键 */
    id: string;
  };

  type DiscoveryOnlineServicesParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
    /** service name */
    name?: string;
    /** service namespace */
    namespace?: string;
  };

  type GetPermissionReply = {
    name?: string;
    alias?: string;
    describe?: string;
    actions?: Action[];
    status?: number;
  };

  type GetRoleReply = {
    name?: string;
    describe?: string;
    status?: number;
    actions?: Action[];
    data_access?: Action[];
  };

  type GetUserReply = {
    user?: UserInfo;
    role_id?: string;
  };

  type GetZoneListReply = {
    pagination?: Pagination;
    /** 可用区列表 */
    data?: ZoneInfo[];
  };

  type GetZoneReply = {
    /** 可用区 */
    data?: ZoneInfo;
  };

  type KVGetValueReply = {
    value?: string;
  };

  type KVListClustersReply = {
    clusters?: string[];
  };

  type KVListKeysReply = {
    keys?: string[];
  };

  type KVUpdateHangReply = {};

  type KVUpdateHangRequest = {
    /** 主键 */
    id?: string;
    /** 挂起状态 true 为挂起1111 */
    hang?: boolean;
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

  type NamespaceApp = {
    id?: string;
    name?: string;
    alias?: string;
    type?: number;
    namespace_id?: string;
    namespace_name?: string;
    namespace_alias?: string;
  };

  type NamespaceAppListReply = {
    data?: NamespaceApp[];
  };

  type NamespaceCreateReply = {
    data?: NamespaceInfo;
  };

  type NamespaceCreateRequest = {
    name?: string;
    alias?: string;
    description?: string;
  };

  type NamespaceDeleteParams = {
    id: string;
  };

  type NamespaceDeleteReply = {};

  type NamespaceGetParams = {
    id: string;
  };

  type NamespaceGetReply = {
    data?: NamespaceInfo;
  };

  type NamespaceInfo = {
    id?: string;
    name?: string;
    alias?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
    running?: number;
  };

  type NamespaceListParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
    name?: string;
  };

  type NamespaceListReply = {
    pagination?: Pagination;
    data?: NamespaceInfo[];
  };

  type NamespaceSimple = {
    id?: string;
    name?: string;
    alias?: string;
  };

  type NamespaceSimpleListReply = {
    data?: NamespaceSimple[];
  };

  type NamespaceUpdateParams = {
    id: string;
  };

  type NamespaceUpdateReply = {
    data?: NamespaceInfo;
  };

  type NamespaceUpdateRequest = {
    id?: string;
    name?: string;
    alias?: string;
    description?: string;
  };

  type NodeInfo = {
    /** 节点ID */
    id?: number;
    /** 节点名称 */
    name?: string;
    /** 节点IP */
    ip?: string;
    /** Agent状态 */
    agent?: Agent;
    /** 节点创建时间 */
    created_at?: string;
    /** 节点更新时间 */
    updated_at?: string;
    /** 可用区ID */
    zone_id?: number;
    /** 可用区编码 */
    zone_code?: string;
    /** 可用区名称 */
    zone_name?: string;
    /** 地区 */
    region_code?: string;
    /** 地区名称 */
    region_name?: string;
    /** 环境变量 */
    env?: string;
    /** 自动上报信息 */
    auto_detect?: boolean;
  };

  type NodeListParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
  };

  type NodeListReply = {
    pagination?: Pagination;
    data?: NodeInfo[];
  };

  type NodeUpdateParams = {
    /** 节点ID */
    id: number;
  };

  type OnlineServiceReply = {
    pagination?: Pagination;
    data?: ServiceGroup[];
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
    describe?: string;
    status?: number;
    actions?: Action[];
    data_access?: Action[];
  };

  type RoleListRoleParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
  };

  type RoleUnbindPermissionParams = {
    id: string;
    permission_id: string;
  };

  type RoleUpdateRoleParams = {
    id: string;
  };

  type Service = {
    id?: string;
    /** 唯一标识 */
    key?: string;
    /** 主机名 */
    hostname?: string;
    /** 服务名称 */
    name?: string;
    /** 版本 */
    version?: string;
    /** 服务地址 */
    endpoints?: string[];
    /** 集群 */
    cluster?: string;
    /** 挂起状态 true 为挂起 */
    hang?: boolean;
    /** 元信息 */
    metadata?: Record<string, any>;
    /** 命名空间 */
    namespace?: string;
    /** 上次心跳间隔 */
    last_healthy_sec?: number;
  };

  type ServiceGroup = {
    /** 唯一标识 */
    key?: string;
    /** 主机名 */
    hostname?: string;
    /** 服务名称 */
    name?: string;
    /** 版本 */
    version?: string;
    /** 服务地址 */
    endpoints?: string[];
    /** 集群 */
    clusters?: string[];
    /** 同服务，不同实例的数组信息 */
    children?: Service[];
    /** 命名空间 */
    namespace?: string;
    /** 数据类型 */
    is_group?: boolean;
  };

  type SimpleListReply = {
    data?: SimpleZoneInfo[];
  };

  type SimpleZoneInfo = {
    /** 可用区ID */
    id?: number;
    /** 可用区名称 */
    name?: string;
    /** 可用区代码 */
    code?: string;
  };

  type UnbindNamespaceReply = {};

  type UnbindPermissionReply = {};

  type UnbindPermissionRequest = {
    id?: string;
    permission_id?: string;
  };

  type UnbindRoleReply = {};

  type UpdateNodeReply = {
    data?: NodeInfo;
  };

  type UpdateNodeRequest = {
    /** 节点名称 */
    name?: string;
    /** 节点IP */
    ip?: string;
    /** Agent自动上报开关 */
    auto_detect?: boolean;
    /** 可用区ID */
    zone_id?: number;
    /** 环境变量 */
    env?: string;
    /** 节点ID */
    id?: number;
  };

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

  type UpdateZoneReply = {};

  type UpdateZoneRequest = {
    id?: number;
    /** 可用区名称 */
    name?: string;
    /** 可用区代码 */
    code?: string;
    /** 地区名称 */
    region_name?: string;
    /** 地区代码 */
    region_code?: string;
    /** 环境 */
    env?: string;
  };

  type UserBindNamespaceParams = {
    id: string;
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
    role_ids?: string[];
  };

  type UserListUserParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
  };

  type UserUnbindNamespaceParams = {
    id: string;
    namespace_id: string;
  };

  type UserUnbindRoleParams = {
    id: string;
    role_id: string;
  };

  type UserUpdateUserParams = {
    id: string;
  };

  type ZoneDeleteParams = {
    id: number;
  };

  type ZoneDisableParams = {
    /** 可用区ID */
    id: number;
  };

  type ZoneGetParams = {
    /** 可用区ID */
    id: number;
  };

  type ZoneInfo = {
    /** 可用区ID */
    id?: number;
    /** 可用区名称 */
    name?: string;
    /** 可用区代码 */
    code?: string;
    /** 地区名称 */
    region_name?: string;
    /** 地区代码 */
    region_code?: string;
    /** 环境 */
    env?: string;
    /** 状态 */
    status?: number;
    /** 创建时间 */
    created_at?: string;
    /** 更新时间 */
    updated_at?: string;
  };

  type ZoneListParams = {
    'pagination.current'?: number;
    'pagination.page_size'?: number;
    'pagination.total'?: number;
    'pagination.raw_total'?: string;
    /** 查询条件 env 环境变量 */
    env?: string;
    /** 查询条件 status 状态 1=正常，2=禁用 */
    status?: number;
  };

  type ZoneUpdateParams = {
    id: number;
  };
}

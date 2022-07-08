'use strict';

const constants = require('../../constants');

const AdminOrchestrator = require('./admin-orchestrator');
const RealmOrchestrator = require('./realm-orchestrator');
const KeyOrchestrator = require('./key-orchestrator');
const EmailOrchestrator = require('./email-orchestrator');
const TokenOrchestrator = require('./token-orchestrator');
const UserOrchestrator = require('./user-orchestrator');
const RoleOrchestrator = require('./role-orchestrator');
const GroupOrchestrator = require('./group-orchestrator');
const PermissionOrchestrator = require('./permission-orchestrator');

/**
 * ADMINS
 */
const orchestratorAdmin = [
  {
    type: constants.types.MsgTypeAdmin,
    action: constants.actions.MsgActionLoginAdmin,
    orchestrator: AdminOrchestrator.LoginAdmin,
    schema: 'adminLoginSchema',
  },
  {
    type: constants.types.MsgTypeAdmin,
    action: constants.actions.MsgActionLogoutAdmin,
    orchestrator: AdminOrchestrator.LogoutAdmin,
  },
];

/**
 * REALMS
 */
const orchestratorRealms = [
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmCreate,
    orchestrator: RealmOrchestrator.CreateRealm,
    schema: 'realmSchema',
  },
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmGetAll,
    orchestrator: RealmOrchestrator.GetAllRealm,
  },
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmGetById,
    orchestrator: RealmOrchestrator.GetByIdRealm,
  },
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmUpdate,
    orchestrator: RealmOrchestrator.UpdateRealm,
  },
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmDelete,
    orchestrator: RealmOrchestrator.DeleteRealm,
  },
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmUsersByRealmName,
    orchestrator: RealmOrchestrator.GetUsersByRealmName,
  },
  {
    type: constants.types.MsgTypeRealm,
    action: constants.actions.MsgActionRealmGroupsByRealmName,
    orchestrator: RealmOrchestrator.GetGroupsByRealmName,
  },
];

/**
 * KEYS
 */
const orchestratorKeys = [
  {
    type: constants.types.MsgTypeKey,
    action: constants.actions.MsgActionKeySaveByRealm,
    orchestrator: KeyOrchestrator.SaveKeyByRealm,
    schema: 'keySchema',
  },
  {
    type: constants.types.MsgTypeKey,
    action: constants.actions.MsgActionKeyGetByRealm,
    orchestrator: KeyOrchestrator.GetKeyByRealm,
  },
];

/**
 * EMAILS
 */
const orchestratorEmails = [
  {
    type: constants.types.MsgTypeEmail,
    action: constants.actions.MsgActionEmailSaveByRealm,
    orchestrator: EmailOrchestrator.SaveEmailByRealm,
    schema: 'emailSchema',
  },
  {
    type: constants.types.MsgTypeEmail,
    action: constants.actions.MsgActionPermissionGetByRealm,
    orchestrator: EmailOrchestrator.GetEmailByRealm,
  },
];

/**
 * TOKENS
 */
const orchestratorTokens = [
  {
    type: constants.types.MsgTypeToken,
    action: constants.actions.MsgActionTokenSaveByRealm,
    orchestrator: TokenOrchestrator.SaveTokenByRealm,
    schema: 'tokenCreateSchema',
  },
  {
    type: constants.types.MsgTypeToken,
    action: constants.actions.MsgActionTokenGetByRealm,
    orchestrator: TokenOrchestrator.GetTokenByRealm,
  },
];

/**
 * ROLES
 */
const orchestratorRoles = [
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleCreate,
    orchestrator: RoleOrchestrator.CreateRole,
    schema: 'roleCreateSchema',
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleGetAll,
    orchestrator: RoleOrchestrator.GetAllRole,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleById,
    orchestrator: RoleOrchestrator.GetRoleById,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleUpdateById,
    orchestrator: RoleOrchestrator.UpdateRoleById,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleGetByName,
    orchestrator: RoleOrchestrator.GetRoleByName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleUpdateByName,
    orchestrator: RoleOrchestrator.UpdateRoleByName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleDeleteByName,
    orchestrator: RoleOrchestrator.DeleteRoleByName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleUsersByRoleName,
    orchestrator: RoleOrchestrator.GetUsersByRoleName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRolePermissionsByRoleName,
    orchestrator: RoleOrchestrator.GetPermissionsByRoleName,
  },
];

/**
 * USERS
 */
const orchestratorUsers = [
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionUserCreate,
    orchestrator: UserOrchestrator.CreateUser,
    schema: 'userCreateSchema',
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionUserGetAll,
    orchestrator: UserOrchestrator.GetAllUser,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionUserGetById,
    orchestrator: UserOrchestrator.GetUserById,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionUserUpDate,
    orchestrator: UserOrchestrator.UpdateUser,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionUserDelete,
    orchestrator: UserOrchestrator.DeleteUser,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionAddRolesToUser,
    orchestrator: UserOrchestrator.AddRolesToUser,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionAddGroupsToUser,
    orchestrator: UserOrchestrator.AddGroupsToUser,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionSetUpTemporaryPassword,
    orchestrator: UserOrchestrator.SetUpTemporaryPassword,
  },
];

/**
 * GROUPS
 */
const orchestratorGroups = [
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupCreate,
    orchestrator: GroupOrchestrator.CreateGroup,
    schema: 'groupSchema',
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupGetAll,
    orchestrator: GroupOrchestrator.GetAllGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupGetById,
    orchestrator: GroupOrchestrator.GetGroupById,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupUpdate,
    orchestrator: GroupOrchestrator.UpdateGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupDelete,
    orchestrator: GroupOrchestrator.DeleteGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupCount,
    orchestrator: GroupOrchestrator.CountGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupUsersByGroupName,
    orchestrator: GroupOrchestrator.GetUsersByGroupName,
  },
];

/**
 * PERMISSIONS
 */
const orchestratorPermissions = [
  {
    type: constants.types.MsgTypePermission,
    action: constants.actions.MsgActionPermissionCreate,
    orchestrator: PermissionOrchestrator.CreatePermission,
    schema: 'permissionSchema',
  },
  {
    type: constants.types.MsgTypePermission,
    action: constants.actions.MsgActionPermissionGetAll,
    orchestrator: PermissionOrchestrator.GetAllPermission,
  },
  {
    type: constants.types.MsgTypePermission,
    action: constants.actions.MsgActionPermissionGetById,
    orchestrator: PermissionOrchestrator.GetPermissionById,
  },
  {
    type: constants.types.MsgTypePermission,
    action: constants.actions.MsgActionPermissionUpdate,
    orchestrator: PermissionOrchestrator.UpdatePermission,
  },
  {
    type: constants.types.MsgTypePermission,
    action: constants.actions.MsgActionPermissionDelete,
    orchestrator: PermissionOrchestrator.DeletePermission,
  },
  {
    type: constants.types.MsgTypePermission,
    action: constants.actions.MsgActionAddRolesToPermission,
    orchestrator: PermissionOrchestrator.AddRolesToPermission,
  },
];

/**
 * BASE
 */
const BaseOrchestrators = [
  ...orchestratorAdmin,
  ...orchestratorRealms,
  ...orchestratorKeys,
  ...orchestratorEmails,
  ...orchestratorTokens,
  ...orchestratorUsers,
  ...orchestratorRoles,
  ...orchestratorGroups,
  ...orchestratorPermissions,
];

module.exports = BaseOrchestrators;

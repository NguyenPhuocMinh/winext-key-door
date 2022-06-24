'use strict';

const constants = require('../../constants');

const AdminOrchestrator = require('./admin-orchestrator');
const RealmOrchestrator = require('./realm-orchestrator');
const UserOrchestrator = require('./user-orchestrator');
const KeyOrchestrator = require('./key-orchestrator');
const TokenOrchestrator = require('./token-orchestrator');

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
    action: constants.actions.MsgActionUserCount,
    orchestrator: UserOrchestrator.CountUsers,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionGetUserGroup,
    orchestrator: UserOrchestrator.GetUserGroup,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionAddUserToGroup,
    orchestrator: UserOrchestrator.AddUserToGroup,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionDeleteUserFromGroup,
    orchestrator: UserOrchestrator.DeleteUserFromGroup,
  },
  {
    type: constants.types.MsgTypeUser,
    action: constants.actions.MsgActionSetUpTemporaryPassword,
    orchestrator: UserOrchestrator.SetUpTemporaryPassword,
  },
];

/**
 * KEYS
 */
const orchestratorKeys = [
  {
    type: constants.types.MsgTypeKey,
    action: constants.actions.MsgActionKeyCreate,
    orchestrator: KeyOrchestrator.CreateKey,
    schema: 'keyCreateSchema',
  },
  {
    type: constants.types.MsgTypeKey,
    action: constants.actions.MsgActionKeyGetById,
    orchestrator: KeyOrchestrator.GetByIdKey,
  },
  {
    type: constants.types.MsgTypeKey,
    action: constants.actions.MsgActionKeyUpdate,
    orchestrator: KeyOrchestrator.UpdateKey,
  },
];

/**
 * TOKENS
 */
const orchestratorTokens = [
  {
    type: constants.types.MsgTypeToken,
    action: constants.actions.MsgActionTokenCreate,
    orchestrator: TokenOrchestrator.CreateToken,
    schema: 'tokenCreateSchema',
  },
  {
    type: constants.types.MsgTypeToken,
    action: constants.actions.MsgActionTokenGetById,
    orchestrator: TokenOrchestrator.GetTokenById,
  },
  {
    type: constants.types.MsgTypeToken,
    action: constants.actions.MsgActionTokenUpdate,
    orchestrator: TokenOrchestrator.UpdateTokenById,
  },
];

/**
 * ROLES
 */
const orchestratorRoles = [
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleCreate,
    orchestrator: UserOrchestrator.CreateRole,
    schema: 'roleCreateSchema',
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleGetAll,
    orchestrator: UserOrchestrator.GetAllRole,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleGetByName,
    orchestrator: UserOrchestrator.GetRoleByName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleUpdateByName,
    orchestrator: UserOrchestrator.UpdateRoleByName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleDeleteByName,
    orchestrator: UserOrchestrator.DeleteRoleByName,
  },
  {
    type: constants.types.MsgTypeRole,
    action: constants.actions.MsgActionRoleUsersByRoleName,
    orchestrator: UserOrchestrator.GetUsersByRoleName,
  },
];

/**
 * GROUPS
 */
const orchestratorGroups = [
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupCreate,
    orchestrator: UserOrchestrator.CreateGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupGetAll,
    orchestrator: UserOrchestrator.GetAllGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupGetById,
    orchestrator: UserOrchestrator.GetGroupById,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupUpdate,
    orchestrator: UserOrchestrator.UpdateGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupDelete,
    orchestrator: UserOrchestrator.DeleteGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupCount,
    orchestrator: UserOrchestrator.CountGroup,
  },
  {
    type: constants.types.MsgTypeGroup,
    action: constants.actions.MsgActionGroupMembers,
    orchestrator: UserOrchestrator.MembersGroup,
  },
];

/**
 * BASE
 */
const BaseOrchestrators = [
  ...orchestratorAdmin,
  ...orchestratorRealms,
  ...orchestratorUsers,
  ...orchestratorRoles,
  ...orchestratorGroups,
  ...orchestratorKeys,
  ...orchestratorTokens,
];

module.exports = BaseOrchestrators;

'use strict';

/**
 * @description TYPES
 */
const types = {
  MsgTypeAdmin: 'ADMIN',
  MsgTypeRealm: 'REALM',
  MsgTypeUser: 'USER',
  MsgTypeRole: 'ROLE',
  MsgTypeGroup: 'GROUP',
  MsgTypeKey: 'KEY',
  MsgTypeToken: 'TOKEN',
  MsgTypePermission: 'TOKEN',
  MsgTypeEmail: 'EMAIL',
};

/**
 * @description ADMINS ACTIONS
 */
const adminActions = {
  MsgActionLoginAdmin: 'ADMIN_LOGIN',
  MsgActionLogoutAdmin: 'ADMIN_LOGOUT',
};

/**
 * @description REALMS ACTIONS
 */
const realmActions = {
  MsgActionRealmCreate: 'REALM_CREATE',
  MsgActionRealmGetAll: 'REALM_GET_ALL',
  MsgActionRealmGetById: 'REALM_GET_BY_ID',
  MsgActionRealmUpdate: 'REALM_UPDATE',
  MsgActionRealmDelete: 'REALM_DELETE',
  MsgActionRealmUsersByRealmName: 'REALM_USERS_BY_REALM_NAME',
  MsgActionRealmGroupsByRealmName: 'REALM_GROUPS_BY_REALM_NAME',
};

/**
 * @description KEYS ACTIONS
 */
const keyActions = {
  MsgActionKeySaveByRealm: 'KEY_SAVE_BY_REALM',
  MsgActionKeyGetByRealm: 'KEY_GET_BY_REALM',
};

/**
 * @description TOKENS ACTIONS
 */
const tokenActions = {
  MsgActionTokenSaveByRealm: 'TOKEN_SAVE_BY_REALM',
  MsgActionTokenGetByRealm: 'TOKEN_GET_BY_REALM',
};

/**
 * @description USERS ACTIONS
 */
const userActions = {
  MsgActionUserCreate: 'USER_CREATE',
  MsgActionUserGetAll: 'USER_GET_ALL',
  MsgActionUserGetById: 'USER_GET_BY_ID',
  MsgActionUserUpDate: 'USER_UPDATE',
  MsgActionUserDelete: 'USER_DELETE',
  MsgActionAddRolesToUser: 'ADD_ROLES_TO_USER',
  MsgActionAddGroupsToUser: 'DELETE_GROUPS_TO_GROUP',
  MsgActionSetUpTemporaryPassword: 'SETUP_TEMPORARY_PASSWORD',
};

/**
 * @description ROLES ACTIONS
 */
const roleActions = {
  MsgActionRoleCreate: 'ROLE_CREATE',
  MsgActionRoleGetAll: 'ROLE_GET_ALL',
  MsgActionRoleById: 'ROLE_GET_BY_ID',
  MsgActionRoleUpdateById: 'ROLE_UPDATE_BY_ID',
  MsgActionRoleGetByName: 'ROLE_GET_BY_NAME',
  MsgActionRoleUpdateByName: 'ROLE_UPDATE_BY_NAME',
  MsgActionRoleDeleteByName: 'ROLE_DELETE_BY_NAME',
  MsgActionRoleUsersByRoleName: 'ROLE_USERS_BY_ROLE_NAME',
  MsgActionRolePermissionsByRoleName: 'ROLE_PERMISSIONS_BY_ROLE_NAME',
};

/**
 * @description GROUPS ACTIONS
 */
const groupActions = {
  MsgActionGroupCreate: 'GROUP_CREATE',
  MsgActionGroupGetAll: 'GROUP_GET_ALL',
  MsgActionGroupGetById: 'GROUP_GET_BY_ID',
  MsgActionGroupUpdate: 'GROUP_UPDATE',
  MsgActionGroupDelete: 'GROUP_DELETE',
  MsgActionGroupCount: 'GROUP_COUNT',
  MsgActionGroupUsersByGroupName: 'GROUP_USERS_BY_GROUP_NAME',
};

/**
 * @description PERMISSIONS ACTIONS
 */
const permissionActions = {
  MsgActionPermissionCreate: 'PERMISSION_CREATE',
  MsgActionPermissionGetAll: 'PERMISSION_GET_ALL',
  MsgActionPermissionGetById: 'PERMISSION_GET_BY_ID',
  MsgActionPermissionUpdate: 'PERMISSION_UPDATE',
  MsgActionPermissionDelete: 'PERMISSION_DELETE',
  MsgActionAddRolesToPermission: 'ADD_ROLES_TO_PERMISSION',
};

/**
 * @description EMAILS ACTIONS
 */
const emailActions = {
  MsgActionEmailSaveByRealm: 'EMAIL_SAVE_BY_REALM',
  MsgActionPermissionGetByRealm: 'EMAIL_GET_BY_REALM',
};

const actions = {
  ...adminActions,
  ...realmActions,
  ...userActions,
  ...roleActions,
  ...groupActions,
  ...keyActions,
  ...tokenActions,
  ...permissionActions,
  ...emailActions,
  ...keyActions,
};

const ATTRIBUTE_TOKEN_KEY = 'X-Access-Token';
const ATTRIBUTE_RETURN_CODE = 'X-Return-Code';
const ATTRIBUTE_REQUEST_ID_KEY = 'X-Request-Id';
const ATTRIBUTE_REQUEST_ID = 'requestID';

const APP_NAME = 'app-key-manager';

const STRUCT_NAME_CORE = 'core';
const STRUCT_NAME_ROUTER = 'router';
const STRUCT_NAME_ORCHESTRATOR = 'orchestrator';
const STRUCT_NAME_REPOSITORY = 'repository';

// database
const STRUCT_NAME_DATABASE = 'database';
// services
const STRUCT_NAME_SERVICE_REDIS = 'redis';

// middlewares
const CORS_MIDDLEWARE = 'cors-middleware';
const REQUEST_ID_MIDDLEWARE = 'requestID-middleware';
const TOKEN_MIDDLEWARE = 'token-middleware';
const ERROR_MIDDLEWARE = 'error-middleware';
const REDIS_MIDDLEWARE = 'redis-middleware';

const STRUCT_MIDDLEWARES = {
  CORS_MIDDLEWARE,
  REQUEST_ID_MIDDLEWARE,
  TOKEN_MIDDLEWARE,
  ERROR_MIDDLEWARE,
  REDIS_MIDDLEWARE,
};

// utils
const CONFIGURE_UTIL = 'configure-util';
const CONVERT_UTIL = 'configure-util';
const ERROR_UTIL = 'error-util';
const LOOKUP_UTIL = 'lookup-util';
const TEMPLATE_UTIL = 'template-util';
const RESPONSE_UTIL = 'response-util';
const VALIDATE_UTIL = 'validate-util';
const GENERATE_UTIL = 'generate-util';

const STRUCT_UTILS = {
  CONFIGURE_UTIL,
  CONVERT_UTIL,
  ERROR_UTIL,
  LOOKUP_UTIL,
  TEMPLATE_UTIL,
  RESPONSE_UTIL,
  VALIDATE_UTIL,
  GENERATE_UTIL,
};

// controllers
const BASE_CONTROLLER = 'base-controller';
const ADMIN_CONTROLLER = 'admin-controller';
const REALM_CONTROLLER = 'realm-controller';
const USER_CONTROLLER = 'user-controller';
const ROLE_CONTROLLER = 'role-controller';
const GROUP_CONTROLLER = 'group-controller';
const CLIENT_CONTROLLER = 'group-controller';
const KEY_CONTROLLER = 'key-controller';
const TOKEN_CONTROLLER = 'token-controller';
const PERMISSION_CONTROLLER = 'permission-controller';
const EMAIL_CONTROLLER = 'email-controller';

const STRUCT_CONTROLLERS = {
  BASE_CONTROLLER,
  ADMIN_CONTROLLER,
  REALM_CONTROLLER,
  USER_CONTROLLER,
  ROLE_CONTROLLER,
  GROUP_CONTROLLER,
  CLIENT_CONTROLLER,
  KEY_CONTROLLER,
  TOKEN_CONTROLLER,
  PERMISSION_CONTROLLER,
  EMAIL_CONTROLLER,
};

// orchestrators
const ADMIN_ORCHESTRATOR = 'admin-orchestrator';
const REALM_ORCHESTRATOR = 'realm-orchestrator';
const USER_ORCHESTRATOR = 'user-orchestrator';
const ROLE_ORCHESTRATOR = 'role-orchestrator';
const GROUP_ORCHESTRATOR = 'group-orchestrator';
const KEY_ORCHESTRATOR = 'key-orchestrator';
const TOKEN_ORCHESTRATOR = 'token-orchestrator';
const PERMISSION_ORCHESTRATOR = 'token-orchestrator';
const EMAIL_ORCHESTRATOR = 'email-orchestrator';

const STRUCT_ORCHESTRATORS = {
  ADMIN_ORCHESTRATOR,
  REALM_ORCHESTRATOR,
  USER_ORCHESTRATOR,
  ROLE_ORCHESTRATOR,
  GROUP_ORCHESTRATOR,
  KEY_ORCHESTRATOR,
  TOKEN_ORCHESTRATOR,
  PERMISSION_ORCHESTRATOR,
  EMAIL_ORCHESTRATOR,
};

const REALM_CACHE = 'realm-cache';

const STRUCT_CACHES = {
  REALM_CACHE,
};

// timezone
const TIMEZONE_DEFAULT = 'Asia/Ho_Chi_Minh';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_SYSTEM = 'system';
const DEFAULT_PASSWORD = 'S3cr3tK3y';

const DEFAULT_LIMIT = 100;
const DEFAULT_SKIP = 0;

// tokens
const TOKEN_ERROR = {
  TOKEN_EXPIRED: 'TokenExpiredError',
};

const HTTP_STATS = {
  SUCCESS: '200',
  CREATED: '201',
  ACCEPTED: '202',
  BAD_REQUEST: '400',
  AUTHORIZATION: '401',
  FORBIDDEN: '403',
  NOT_FOUND: '404',
  SERVER_ERROR: '500',
};

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  OPTIONS: 'OPTIONS',
};

const constants = {
  types,
  actions,
  ATTRIBUTE_TOKEN_KEY,
  ATTRIBUTE_RETURN_CODE,
  ATTRIBUTE_REQUEST_ID_KEY,
  ATTRIBUTE_REQUEST_ID,
  APP_NAME,
  STRUCT_NAME_CORE,
  STRUCT_NAME_DATABASE,
  STRUCT_NAME_SERVICE_REDIS,
  STRUCT_NAME_ROUTER,
  STRUCT_NAME_ORCHESTRATOR,
  STRUCT_NAME_REPOSITORY,
  STRUCT_MIDDLEWARES,
  STRUCT_UTILS,
  STRUCT_CONTROLLERS,
  STRUCT_ORCHESTRATORS,
  STRUCT_CACHES,
  TIMEZONE_DEFAULT,
  DEFAULT_PASSWORD,
  DATE_FORMAT,
  DEFAULT_SYSTEM,
  DEFAULT_LIMIT,
  DEFAULT_SKIP,
  TOKEN_ERROR,
  HTTP_STATS,
  HTTP_METHOD,
};

module.exports = constants;

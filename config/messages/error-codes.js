'use strict';

const ErrorCodes = {
  TokenNotFound: {
    message: 'common.notifications.errors.tokenNotFound',
    returnCode: 10001,
    statusCode: 401,
  },
  TokenExpiredError: {
    message: 'common.notifications.errors.tokenExpiredError',
    returnCode: 10002,
    statusCode: 401,
  },
  OrchestratorHandlerNotFound: {
    message: 'common.notifications.errors.orchestratorHandlerNotFound',
    returnCode: 10003,
    statusCode: 400,
  },
  SchemaNotFound: {
    message: 'common.notifications.errors.schemaNotFound',
    returnCode: 10004,
    statusCode: 400,
  },
  UserNameAdminNotFound: {
    message: 'admin.notifications.errors.userNameAdminNotFound',
    returnCode: 10005,
    statusCode: 400,
  },
  IncorrectPasswordAdmin: {
    message: 'admin.notifications.errors.incorrectPasswordAdmin',
    returnCode: 10006,
    statusCode: 400,
  },
  DuplicateRealmName: {
    message: 'resources.configures.realms.notifications.errors.duplicateName',
    returnCode: 10007,
    statusCode: 409,
  },
  RealmNotFound: {
    message: 'resources.manages.realms.notifications.errors.nameNotFound',
    returnCode: 10008,
    statusCode: 400,
  },
  RealmIDNotFound: {
    message: 'resources.manages.realms.notifications.errors.idNotFound',
    returnCode: 10009,
    statusCode: 400,
  },
  DuplicateRoleName: {
    message: 'resources.manages.roles.notifications.errors.duplicateName',
    returnCode: 100010,
    statusCode: 409,
  },
  RoleNotFound: {
    message: 'resources.manages.roles.notifications.errors.duplicateName',
    returnCode: 100011,
    statusCode: 409,
  },
  RoleIDNotFound: {
    message: 'resources.manages.roles.notifications.errors.notfound.id',
    returnCode: 100012,
    statusCode: 409,
  },
  DuplicateUserName: {
    message: 'resources.manages.users.notifications.errors.duplicateName',
    returnCode: 100013,
    statusCode: 409,
  },
  UserNotFound: {
    message: 'resources.manages.users.notifications.errors.notfound.name',
    returnCode: 100014,
    statusCode: 400,
  },
  UserIDNotFound: {
    message: 'resources.manages.users.notifications.errors.notfound.id',
    returnCode: 100015,
    statusCode: 400,
  },
  PermissionNotFound: {
    message: 'resources.manages.permissions.notifications.errors.notfound.name',
    returnCode: 100016,
    statusCode: 400,
  },
  PermissionIDNotFound: {
    message: 'resources.manages.permissions.notifications.errors.notfound.id',
    returnCode: 100017,
    statusCode: 400,
  },
  DuplicateGroupName: {
    message: 'resources.manages.groups.notifications.errors.duplicateName',
    returnCode: 100018,
    statusCode: 409,
  },
  DuplicateGroupOrRealmName: {
    message: 'resources.manages.groups.notifications.errors.duplicateGroupOrRealmName',
    returnCode: 100019,
    statusCode: 409,
  },
  KeyNotFound: {
    message: 'resources.configures.realms.notifications.errors.keyNotFound',
    returnCode: 100019,
    statusCode: 400,
  },
  EmailNotFound: {
    message: 'resources.configures.realms.notifications.errors.emailNotFound',
    returnCode: 100019,
    statusCode: 400,
  },
};

module.exports = ErrorCodes;

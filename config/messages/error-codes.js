'use strict';

const ErrorCodes = {
  TokenNotFound: {
    message: 'Token not found !!!',
    returnCode: 1001,
    statusCode: 401,
  },
  TokenExpiredError: {
    message: 'Token expired !!!',
    returnCode: 1002,
    statusCode: 401,
  },
  OrchestratorHandlerNotFound: {
    message: 'Not found function OrchestratorHandler',
    returnCode: 1001,
    statusCode: 400,
  },
  SchemaNotFound: {
    message: 'Not found schema validate',
    returnCode: 1001,
    statusCode: 400,
  },
  UserNameAdminNotFound: {
    message: 'admin.notification.login.username_notfound',
    returnCode: 1001,
    statusCode: 400,
  },
  IncorrectPasswordAdmin: {
    message: 'admin.notification.login.password_incorrect',
    returnCode: 1002,
    statusCode: 400,
  },
  DuplicateRealmName: {
    message: 'realms.notification.create.duplicate_name',
    returnCode: 3001,
    statusCode: 409,
  },
  DuplicateRoleName: {
    message: 'roles.notification.create.duplicate_name',
    returnCode: 3002,
    statusCode: 409,
  },
  DuplicateUserName: {
    message: 'users.notification.create.duplicate_name',
    returnCode: 3003,
    statusCode: 409,
  },
  RealmNotFound: {
    message: 'users.notification.create.realm_notfound',
    returnCode: 3003,
    statusCode: 400,
  },
  RealmIDNotFound: {
    message: 'realms.notification.id_notfound',
    returnCode: 3003,
    statusCode: 400,
  },
  UserIdNotFound: {
    message: 'users.notification.create.id_notfound',
    returnCode: 3003,
    statusCode: 400,
  },
  DuplicateKeyName: {
    message: 'notifications.keys.create.duplicate_name',
    returnCode: 3003,
    statusCode: 409,
  },
  KeyIdNotFound: {
    message: 'notifications.keys.id_notfound',
    returnCode: 3003,
    statusCode: 409,
  },
};

module.exports = ErrorCodes;

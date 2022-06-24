'use strict';

const SuccessCodes = {
  LoginAdminSuccess: {
    message: 'admin.notification.login.success',
    returnCode: 1010,
    statusCode: 200,
  },
  LogoutAdminSuccess: {
    message: 'admin.notification.logout.success',
    returnCode: 1011,
    statusCode: 200,
  },
  GetRealmsSuccess: {
    message: 'notifications.realms.get.success',
    returnCode: 1012,
    statusCode: 200,
  },
  CreateRealmSuccess: {
    message: 'notifications.realms.create.success',
    returnCode: 1013,
    statusCode: 201,
  },
  GetRealmByIDSuccess: {
    message: 'notifications.realms.getID.success',
    returnCode: 1014,
    statusCode: 200,
  },
  UpdateRealmSuccess: {
    message: 'notifications.realms.update.success',
    returnCode: 1015,
    statusCode: 200,
  },
  DeleteRealmSuccess: {
    message: 'notifications.realms.delete.success',
    returnCode: 1016,
    statusCode: 200,
  },
  GetRolesSuccess: {
    message: 'roles.notification.get.success',
    returnCode: 1017,
    statusCode: 201,
  },
  CreateRoleSuccess: {
    message: 'roles.notification.create.success',
    returnCode: 1017,
    statusCode: 201,
  },
  GetRoleByIDSuccess: {
    message: 'roles.notification.getID.success',
    returnCode: 1017,
    statusCode: 201,
  },
  UpdateRoleSuccess: {
    message: 'roles.notification.update.success',
    returnCode: 1017,
    statusCode: 201,
  },
  GetUsersSuccess: {
    message: 'users.notification.get.success',
    returnCode: 1012,
    statusCode: 200,
  },
  CreateUserSuccess: {
    message: 'users.notification.create.success',
    returnCode: 1012,
    statusCode: 201,
  },
  GetUserByIDSuccess: {
    message: 'users.notification.getID.success',
    returnCode: 1012,
    statusCode: 200,
  },
  CreateKeySuccess: {
    message: 'notifications.keys.create.success',
    returnCode: 1012,
    statusCode: 200,
  },
  GetKeyByIDSuccess: {
    message: 'notifications.keys.getID.success',
    returnCode: 1012,
    statusCode: 200,
  },
  UpdateKeySuccess: {
    message: 'notifications.keys.update.success',
    returnCode: 1012,
    statusCode: 200,
  },
};

module.exports = SuccessCodes;

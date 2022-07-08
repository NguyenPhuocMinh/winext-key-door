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
    message: 'resources.configures.realms.notifications.success.get',
    returnCode: 1012,
    statusCode: 200,
  },
  CreateRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.create',
    returnCode: 1013,
    statusCode: 201,
  },
  GetRealmByIDSuccess: {
    message: 'resources.configures.realms.notifications.success.getID',
    returnCode: 1014,
    statusCode: 200,
  },
  UpdateRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.update',
    returnCode: 1015,
    statusCode: 200,
  },
  DeleteRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.delete',
    returnCode: 1016,
    statusCode: 200,
  },
  GetUsersByRealmNameSuccess: {
    message: 'resources.configures.realms.notifications.success.getUsers',
    returnCode: 1017,
    statusCode: 200,
  },
  GetGroupsByRealmNameSuccess: {
    message: 'resources.configures.realms.notifications.success.getGroups',
    returnCode: 1018,
    statusCode: 200,
  },
  SaveKeyByRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.saveKey',
    returnCode: 1019,
    statusCode: 200,
  },
  GetKeyByRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.getKey',
    returnCode: 1020,
    statusCode: 200,
  },
  SaveEmailByRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.saveEmail',
    returnCode: 1021,
    statusCode: 200,
  },
  GetEmailByRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.getEmail',
    returnCode: 1021,
    statusCode: 200,
  },
  SaveTokenByRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.saveToken',
    returnCode: 1022,
    statusCode: 200,
  },
  GetTokenByRealmSuccess: {
    message: 'resources.configures.realms.notifications.success.getToken',
    returnCode: 1022,
    statusCode: 200,
  },
  GetRolesSuccess: {
    message: 'resources.manages.roles.notifications.success.get',
    returnCode: 1017,
    statusCode: 200,
  },
  CreateRoleSuccess: {
    message: 'resources.manages.roles.notifications.success.create',
    returnCode: 1018,
    statusCode: 201,
  },
  GetRoleByIDSuccess: {
    message: 'resources.manages.roles.notifications.success.getID',
    returnCode: 1019,
    statusCode: 200,
  },
  UpdateRoleSuccess: {
    message: 'resources.manages.roles.notifications.success.update',
    returnCode: 1020,
    statusCode: 200,
  },
  GetUsersInRoleSuccess: {
    message: 'resources.manages.roles.notifications.success.getUsers',
    returnCode: 1021,
    statusCode: 200,
  },
  GetPermissionsInRoleSuccess: {
    message: 'resources.manages.roles.notifications.success.getPermissions',
    returnCode: 1022,
    statusCode: 200,
  },
  GetUsersSuccess: {
    message: 'resources.manages.users.notifications.success.get',
    returnCode: 1021,
    statusCode: 200,
  },
  CreateUserSuccess: {
    message: 'resources.manages.users.notifications.success.create',
    returnCode: 1022,
    statusCode: 201,
  },
  GetUserByIDSuccess: {
    message: 'resources.manages.users.notifications.success.getID',
    returnCode: 1023,
    statusCode: 200,
  },
  UpdateUserByIDSuccess: {
    message: 'resources.manages.users.notifications.success.update',
    returnCode: 1024,
    statusCode: 200,
  },
  DeleteUserByIDSuccess: {
    message: 'resources.manages.users.notifications.success.delete',
    returnCode: 1025,
    statusCode: 200,
  },
  SetTemporaryPasswordUserSuccess: {
    message: 'resources.manages.users.notifications.success.setTemporaryPassword',
    returnCode: 1026,
    statusCode: 200,
  },
  GetGroupsSuccess: {
    message: 'resources.manages.groups.notifications.success.get',
    returnCode: 1026,
    statusCode: 200,
  },
  CreateGroupSuccess: {
    message: 'resources.manages.groups.notifications.success.create',
    returnCode: 1027,
    statusCode: 201,
  },
  GetGroupIDSuccess: {
    message: 'resources.manages.groups.notifications.success.getID',
    returnCode: 1028,
    statusCode: 200,
  },
  UpdateGroupSuccess: {
    message: 'resources.manages.groups.notifications.success.update',
    returnCode: 1028,
    statusCode: 200,
  },
  DeleteGroupSuccess: {
    message: 'resources.manages.groups.notifications.success.delete',
    returnCode: 1029,
    statusCode: 200,
  },
  GetUsersByGroupNameSuccess: {
    message: 'resources.manages.groups.notifications.success.getUsers',
    returnCode: 1030,
    statusCode: 200,
  },
  AddRolesToUserSuccess: {
    message: 'resources.manages.users.notifications.success.addRoles',
    returnCode: 1030,
    statusCode: 200,
  },
  AddGroupsToUserSuccess: {
    message: 'resources.manages.users.notifications.success.addGroups',
    returnCode: 1031,
    statusCode: 200,
  },
  CreatePermissionSuccess: {
    message: 'resources.manages.permissions.notifications.success.create',
    returnCode: 1032,
    statusCode: 201,
  },
  GetPermissionsSuccess: {
    message: 'resources.manages.permissions.notifications.success.get',
    returnCode: 1033,
    statusCode: 200,
  },
  GetPermissionIDSuccess: {
    message: 'resources.manages.permissions.notifications.success.getID',
    returnCode: 1034,
    statusCode: 200,
  },
  UpdatePermissionSuccess: {
    message: 'resources.manages.permissions.notifications.success.update',
    returnCode: 1035,
    statusCode: 200,
  },
  DeletePermissionSuccess: {
    message: 'resources.manages.permissions.notifications.success.delete',
    returnCode: 1036,
    statusCode: 200,
  },
  AddRolesToPermissionSuccess: {
    message: 'resources.manages.permissions.notifications.success.addRoles',
    returnCode: 1037,
    statusCode: 200,
  },
};

module.exports = SuccessCodes;

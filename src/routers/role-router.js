'use strict';

const { RoleController } = require('../controllers');

/**
 * @description Register role router
 */
const RoleRouter = [
  {
    pathName: '/roles',
    method: 'POST',
    methodName: 'CreateRole',
    controller: RoleController.CreateRole,
  },
  {
    pathName: '/roles',
    method: 'GET',
    methodName: 'GetAllRole',
    controller: RoleController.GetAllRole,
  },
  {
    pathName: '/roles/:id',
    method: 'GET',
    methodName: 'GetRoleById',
    controller: RoleController.GetRoleById,
  },
  {
    pathName: '/roles/:id',
    method: 'PUT',
    methodName: 'UpdateRoleById',
    controller: RoleController.UpdateRoleById,
  },
  {
    pathName: '/:realm/roles/:role-name',
    method: 'GET',
    methodName: 'GetRoleByName',
    controller: RoleController.GetRoleByName,
  },
  {
    pathName: '/:realm/roles/:role-name',
    method: 'PUT',
    methodName: 'UpdateRoleByName',
    controller: RoleController.UpdateRoleByName,
  },
  {
    pathName: '/:realm/roles/:role-name',
    method: 'DELETE',
    methodName: 'DeleteRoleByName',
    controller: RoleController.DeleteRoleByName,
  },
  {
    pathName: '/roles/:roleName/users',
    method: 'GET',
    methodName: 'GetUsersByRoleName',
    controller: RoleController.GetUsersByRoleName,
  },
  {
    pathName: '/roles/:roleName/permissions',
    method: 'GET',
    methodName: 'GetPermissionsByRoleName',
    controller: RoleController.GetPermissionsByRoleName,
  },
];

module.exports = RoleRouter;

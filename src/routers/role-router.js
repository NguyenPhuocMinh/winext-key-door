'use strict';

const { RoleController } = require('../controllers');

/**
 * @description Register role router
 */
const RoleRouter = [
  {
    pathName: '/:realm/roles',
    method: 'POST',
    methodName: 'CreateRole',
    controller: RoleController.CreateRole,
  },
  {
    pathName: '/:realm/roles',
    method: 'GET',
    methodName: 'GetAllRole',
    controller: RoleController.GetAllRole,
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
    pathName: '/:realm/roles/:role-name/users',
    method: 'GET',
    methodName: 'GetUsersByRoleName',
    controller: RoleController.GetUsersByRoleName,
  },
];

module.exports = RoleRouter;

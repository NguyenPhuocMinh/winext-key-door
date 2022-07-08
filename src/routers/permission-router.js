'use strict';

const { PermissionController } = require('../controllers');

/**
 * @description Register permission router
 */
const PermissionRouter = [
  {
    pathName: '/permissions',
    method: 'POST',
    methodName: 'CreatePermission',
    controller: PermissionController.CreatePermission,
  },
  {
    pathName: '/permissions',
    method: 'GET',
    methodName: 'GetAllPermission',
    controller: PermissionController.GetAllPermission,
  },
  {
    pathName: '/permissions/:id',
    method: 'GET',
    methodName: 'GetPermissionById',
    controller: PermissionController.GetPermissionById,
  },
  {
    pathName: '/permissions/:id',
    method: 'PUT',
    methodName: 'UpdatePermission',
    controller: PermissionController.UpdatePermission,
  },
  {
    pathName: '/permissions/:id',
    method: 'DELETE',
    methodName: 'DeletePermission',
    controller: PermissionController.DeletePermission,
  },
  {
    pathName: '/permissions/:id/assign-roles',
    method: 'PATCH',
    methodName: 'AddRolesToPermission',
    controller: PermissionController.AddRolesToPermission,
  },
];

module.exports = PermissionRouter;

'use strict';

const { UserController } = require('../controllers');

/**
 * @description Register user router
 */
const UserRouter = [
  {
    pathName: '/users',
    method: 'POST',
    methodName: 'CreateUser',
    controller: UserController.CreateUser,
  },
  {
    pathName: '/users',
    method: 'GET',
    methodName: 'GetAllUser',
    controller: UserController.GetAllUser,
  },
  {
    pathName: '/users/:id',
    method: 'GET',
    methodName: 'GetUserById',
    controller: UserController.GetUserById,
  },
  {
    pathName: '/users/:id',
    method: 'PATCH',
    methodName: 'UpdateUser',
    controller: UserController.UpdateUser,
  },
  {
    pathName: '/users/:id',
    method: 'DELETE',
    methodName: 'DeleteUser',
    controller: UserController.DeleteUser,
  },
  {
    pathName: '/users/:id/assign-roles',
    method: 'PATCH',
    methodName: 'AddRolesToUser',
    controller: UserController.AddRolesToUser,
  },
  {
    pathName: '/users/:id/assign-groups',
    method: 'PATCH',
    methodName: 'AddGroupsToUser',
    controller: UserController.AddGroupsToUser,
  },
  {
    pathName: '/users/:id/temporary-password',
    method: 'PATCH',
    methodName: 'SetUpTemporaryPassword',
    controller: UserController.SetUpTemporaryPassword,
  },
];

module.exports = UserRouter;

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
    pathName: '/users/count',
    method: 'GET',
    methodName: 'CountUsers',
    controller: UserController.CountUsers,
  },
  {
    pathName: '/users/:id/groups',
    method: 'GET',
    methodName: 'GetUserGroup',
    controller: UserController.GetUserGroup,
  },
  {
    pathName: '/:realm/users/:id/groups/:groupId',
    method: 'PUT',
    methodName: 'AddUserToGroup',
    controller: UserController.AddUserToGroup,
  },
  {
    pathName: '/:realm/users/:id/groups/:groupId',
    method: 'DELETE',
    methodName: 'DeleteUserFromGroup',
    controller: UserController.DeleteUserFromGroup,
  },
  {
    pathName: '/:realm/users/:id/reset-password',
    method: 'PUT',
    methodName: 'SetUpTemporaryPassword',
    controller: UserController.SetUpTemporaryPassword,
  },
];

module.exports = UserRouter;

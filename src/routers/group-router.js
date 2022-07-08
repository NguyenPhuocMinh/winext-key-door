'use strict';

const { GroupController } = require('../controllers');

/**
 * @description Register group router
 */
const GroupRouter = [
  {
    pathName: '/groups',
    method: 'POST',
    methodName: 'CreateGroup',
    controller: GroupController.CreateGroup,
  },
  {
    pathName: '/groups',
    method: 'GET',
    methodName: 'GetAllGroup',
    controller: GroupController.GetAllGroup,
  },
  {
    pathName: '/groups/:id',
    method: 'GET',
    methodName: 'GetGroupById',
    controller: GroupController.GetGroupById,
  },
  {
    pathName: '/groups/:id',
    method: 'PUT',
    methodName: 'UpdateGroup',
    controller: GroupController.UpdateGroup,
  },
  {
    pathName: '/groups/:id',
    method: 'DELETE',
    methodName: 'DeleteGroup',
    controller: GroupController.DeleteGroup,
  },
  {
    pathName: '/groups/count',
    method: 'GET',
    methodName: 'CountGroup',
    controller: GroupController.CountGroup,
  },
  {
    pathName: '/groups/:groupName/:realmName/users',
    method: 'GET',
    methodName: 'GetUsersByGroupName',
    controller: GroupController.GetUsersByGroupName,
  },
];

module.exports = GroupRouter;

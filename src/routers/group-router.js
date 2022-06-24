'use strict';

const { GroupController } = require('../controllers');

/**
 * @description Register group router
 */
const GroupRouter = [
  {
    pathName: '/:realm/groups',
    method: 'POST',
    methodName: 'CreateGroup',
    controller: GroupController.CreateGroup,
  },
  {
    pathName: '/:realm/groups',
    method: 'GET',
    methodName: 'GetAllGroup',
    controller: GroupController.GetAllGroup,
  },
  {
    pathName: '/:realm/groups/:id',
    method: 'GET',
    methodName: 'GetGroupById',
    controller: GroupController.GetGroupById,
  },
  {
    pathName: '/:realm/groups/:id',
    method: 'PUT',
    methodName: 'UpdateGroup',
    controller: GroupController.UpdateGroup,
  },
  {
    pathName: '/:realm/groups/:id',
    method: 'DELETE',
    methodName: 'DeleteGroup',
    controller: GroupController.DeleteGroup,
  },
  {
    pathName: '/:realm/groups/count',
    method: 'GET',
    methodName: 'CountGroup',
    controller: GroupController.CountGroup,
  },
  {
    pathName: '/:realm/groups/:id/members',
    method: 'GET',
    methodName: 'MembersGroup',
    controller: GroupController.MembersGroup,
  },
];

module.exports = GroupRouter;

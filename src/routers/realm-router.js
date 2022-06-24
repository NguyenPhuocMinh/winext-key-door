'use strict';

const { RealmController } = require('../controllers');

/**
 * @description Register realm router
 */
const RealmRouter = [
  {
    pathName: '/realms',
    method: 'POST',
    methodName: 'CreateRealm',
    controller: RealmController.CreateRealm,
  },
  {
    pathName: '/realms',
    method: 'GET',
    methodName: 'GetAllRealm',
    controller: RealmController.GetAllRealm,
  },
  {
    pathName: '/realms/:id',
    method: 'GET',
    methodName: 'GetByIdRealm',
    controller: RealmController.GetByIdRealm,
  },
  {
    pathName: '/realms/:id',
    method: 'PATCH',
    methodName: 'UpdateRealm',
    controller: RealmController.UpdateRealm,
  },
  {
    pathName: '/realms/:id',
    method: 'DELETE',
    methodName: 'DeleteRealm',
    controller: RealmController.DeleteRealm,
  },
];

module.exports = RealmRouter;

'use strict';

const { AdminController } = require('../controllers');

/**
 * @description Register admin router
 */
const AdminRouter = [
  {
    pathName: '/login',
    method: 'POST',
    methodName: 'LoginAdmin',
    controller: AdminController.LoginAdmin,
  },
  {
    pathName: '/logout',
    method: 'POST',
    methodName: 'LogoutAdmin',
    controller: AdminController.LogoutAdmin,
  },
];

module.exports = AdminRouter;

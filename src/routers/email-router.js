'use strict';

const { EmailController } = require('../controllers');

/**
 * @description Register email router
 */
const AdminRouter = [
  {
    pathName: '/:realm/emails',
    method: 'POST',
    methodName: 'SaveEmailByRealm',
    controller: EmailController.SaveEmailByRealm,
  },
  {
    pathName: '/:realm/emails',
    method: 'GET',
    methodName: 'GetEmailByRealm',
    controller: EmailController.GetEmailByRealm,
  },
];

module.exports = AdminRouter;

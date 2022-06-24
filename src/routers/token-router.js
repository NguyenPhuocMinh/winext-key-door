'use strict';

const { TokenController } = require('../controllers');

/**
 * @description Register token router
 */
const RoleRouter = [
  {
    pathName: '/:realm/tokens',
    method: 'POST',
    methodName: 'CreateToken',
    controller: TokenController.CreateToken,
  },
  {
    pathName: '/:realm/tokens/:id',
    method: 'GET',
    methodName: 'GetTokenById',
    controller: TokenController.GetTokenById,
  },
  {
    pathName: '/:realm/tokens/:id',
    method: 'PATCH',
    methodName: 'UpdateTokenById',
    controller: TokenController.UpdateTokenById,
  },
];

module.exports = RoleRouter;

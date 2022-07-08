'use strict';

const { TokenController } = require('../controllers');

/**
 * @description Register token router
 */
const TokenRouter = [
  {
    pathName: '/:realm/tokens',
    method: 'POST',
    methodName: 'SaveTokenByRealm',
    controller: TokenController.SaveTokenByRealm,
  },
  {
    pathName: '/:realm/tokens',
    method: 'GET',
    methodName: 'GetTokenByRealm',
    controller: TokenController.GetTokenByRealm,
  },
];

module.exports = TokenRouter;

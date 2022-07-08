'use strict';

const { KeyController } = require('../controllers');

/**
 * @description Register key router
 */
const KeyRouter = [
  {
    pathName: '/:realm/keys',
    method: 'POST',
    methodName: 'SaveKeyByRealm',
    controller: KeyController.SaveKeyByRealm,
  },
  {
    pathName: '/:realm/keys',
    method: 'GET',
    methodName: 'GetKeyByRealm',
    controller: KeyController.GetKeyByRealm,
  },
];

module.exports = KeyRouter;

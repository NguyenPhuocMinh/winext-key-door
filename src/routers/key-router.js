'use strict';

const { KeyController } = require('../controllers');

/**
 * @description Register key router
 */
const KeyRouter = [
  {
    pathName: '/:realm/keys',
    method: 'POST',
    methodName: 'CreateKey',
    controller: KeyController.CreateKey,
  },
  {
    pathName: '/:realm/keys/:id',
    method: 'GET',
    methodName: 'GetKeyById',
    controller: KeyController.GetKeyById,
  },
  {
    pathName: '/:realm/keys/:id',
    method: 'PATCH',
    methodName: 'CreateKey',
    controller: KeyController.UpdateKey,
  },
];

module.exports = KeyRouter;

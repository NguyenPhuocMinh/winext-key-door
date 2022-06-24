'use strict';

const winext = require('winext');
const express = require('express');
const logger = require('winext-logger');
const lodash = winext.require('lodash');
const { get, toLower } = lodash;

// configs
const constants = require('../../constants');

const router = express.Router();
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_NAME_ROUTER);

const AdminRouter = require('./admin-router');
const RealmRouter = require('./realm-router');
const UserRouter = require('./user-router');
const RoleRouter = require('./role-router');
const GroupRouter = require('./group-router');
const KeyRouter = require('./key-router');
const TokenRouter = require('./token-router');

const Routes = [
  ...AdminRouter,
  ...RealmRouter,
  ...UserRouter,
  ...RoleRouter,
  ...GroupRouter,
  ...KeyRouter,
  ...TokenRouter,
];

/**
 * @description Init layer router
 * @returns {Array}
 */
const InitRouters = Routes.map((route) => {
  try {
    loggerFactory.data(`Layer route`, {
      args: route,
    });
    const pathName = get(route, 'pathName');
    const method = get(route, 'method');
    const controller = get(route, 'controller');

    router[toLower(method)](pathName, controller);

    return router;
  } catch (err) {
    loggerFactory.error(`Layer route has error`, {
      args: err.message,
    });
    throw err;
  }
});

module.exports = InitRouters;

'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.TOKEN_CONTROLLER);

/**
 * @description Save Token By Realm Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const SaveTokenByRealm = (req, res, next) => {
  loggerFactory.info(`Function SaveTokenByRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeToken, constants.actions.MsgActionTokenSaveByRealm);
  loggerFactory.info(`Function SaveTokenByRealm controller has been end`);
};

/**
 * @description Get Token By Realm Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetTokenByRealm = (req, res, next) => {
  loggerFactory.info(`Function GetTokenByRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeToken, constants.actions.MsgActionTokenGetByRealm);
  loggerFactory.info(`Function GetTokenByRealm controller has been end`);
};

module.exports = {
  SaveTokenByRealm: SaveTokenByRealm,
  GetTokenByRealm: GetTokenByRealm,
};

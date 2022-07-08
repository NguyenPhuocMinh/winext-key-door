'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.KEY_CONTROLLER);

/**
 * @description Save Key By Realm Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const SaveKeyByRealm = (req, res, next) => {
  loggerFactory.info(`Function SaveKeyByRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeKey, constants.actions.MsgActionKeySaveByRealm);
  loggerFactory.info(`Function SaveKeyByRealm controller has been end`);
};

/**
 * @description Get Key By Realm Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetKeyByRealm = (req, res, next) => {
  loggerFactory.info(`Function GetKeyByRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeKey, constants.actions.MsgActionKeyGetByRealm);
  loggerFactory.info(`Function GetKeyByRealm controller has been end`);
};

module.exports = {
  SaveKeyByRealm: SaveKeyByRealm,
  GetKeyByRealm: GetKeyByRealm,
};

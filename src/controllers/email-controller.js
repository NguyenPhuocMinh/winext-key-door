'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.EMAIL_CONTROLLER);

/**
 * @description Save Email By Realm Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const SaveEmailByRealm = (req, res, next) => {
  loggerFactory.info(`Function SaveEmailByRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeEmail, constants.actions.MsgActionEmailSaveByRealm);
  loggerFactory.info(`Function SaveEmailByRealm controller has been end`);
};

/**
 * @description Get Email By Realm Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetEmailByRealm = (req, res, next) => {
  loggerFactory.info(`Function GetEmailByRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeEmail, constants.actions.MsgActionPermissionGetByRealm);
  loggerFactory.info(`Function GetEmailByRealm controller has been end`);
};

module.exports = {
  SaveEmailByRealm: SaveEmailByRealm,
  GetEmailByRealm: GetEmailByRealm,
};

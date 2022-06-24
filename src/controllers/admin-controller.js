'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.ADMIN_CONTROLLER);

/**
 * @description Login admin controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const LoginAdmin = (req, res, next) => {
  loggerFactory.info(`Function loginAdmin controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeAdmin, constants.actions.MsgActionLoginAdmin);
  loggerFactory.info(`Function loginAdmin controller has been end`);
};

/**
 * @description Logout admin controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const LogoutAdmin = (req, res, next) => {
  loggerFactory.info(`Function logOutAdmin controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeAdmin, constants.actions.MsgActionLogoutAdmin);
  loggerFactory.info(`Function logOutAdmin controller has been end`);
};

module.exports = {
  LoginAdmin: LoginAdmin,
  LogoutAdmin: LogoutAdmin,
};

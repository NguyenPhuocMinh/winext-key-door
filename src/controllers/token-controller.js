'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.TOKEN_CONTROLLER);

/**
 * @description Create a new token for the realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreateToken = (req, res, next) => {
  loggerFactory.info(`Function CreateToken controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeToken, constants.actions.MsgActionTokenCreate);
  loggerFactory.info(`Function CreateToken controller has been end`);
};

/**
 * @description Get token by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetTokenById = (req, res, next) => {
  loggerFactory.info(`Function GetTokenById controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeToken, constants.actions.MsgActionTokenGetById);
  loggerFactory.info(`Function GetTokenById controller has been end`);
};

/**
 * @description Update token by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdateTokenById = (req, res, next) => {
  loggerFactory.info(`Function UpdateTokenById controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeToken, constants.actions.MsgActionTokenUpdate);
  loggerFactory.info(`Function UpdateTokenById controller has been end`);
};

module.exports = {
  CreateToken: CreateToken,
  GetTokenById: GetTokenById,
  UpdateTokenById: UpdateTokenById,
};

'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.KEY_CONTROLLER);

/**
 * @description Create key controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreateKey = (req, res, next) => {
  loggerFactory.info(`Function CreateKey controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeKey, constants.actions.MsgActionKeyCreate);
  loggerFactory.info(`Function CreateKey controller has been end`);
};

/**
 * @description Get key by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetKeyById = (req, res, next) => {
  loggerFactory.info(`Function GetKeyById controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeKey, constants.actions.MsgActionKeyGetById);
  loggerFactory.info(`Function GetKeyById controller has been end`);
};

/**
 * @description Logout admin controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdateKey = (req, res, next) => {
  loggerFactory.info(`Function UpdateKey controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeKey, constants.actions.MsgActionKeyUpdate);
  loggerFactory.info(`Function UpdateKey controller has been end`);
};

module.exports = {
  CreateKey: CreateKey,
  GetKeyById: GetKeyById,
  UpdateKey: UpdateKey,
};

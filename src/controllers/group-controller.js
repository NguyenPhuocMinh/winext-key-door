'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.GROUP_CONTROLLER);

/**
 * @description Create new group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreateGroup = (req, res, next) => {
  loggerFactory.info(`Function createGroup controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupCreate);
  loggerFactory.info(`Function createGroup controller has been end`);
};

/**
 * @description Get all group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetAllGroup = (req, res, next) => {
  loggerFactory.info(`Function getAllGroup controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupGetAll);
  loggerFactory.info(`Function getAllGroup controller has been end`);
};

/**
 * @description Get group by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetGroupById = (req, res, next) => {
  loggerFactory.info(`Function getGroupById controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupGetById);
  loggerFactory.info(`Function getGroupById controller has been end`);
};

/**
 * @description Update group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdateGroup = (req, res, next) => {
  loggerFactory.info(`Function updateGroup controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupUpdate);
  loggerFactory.info(`Function updateGroup controller has been end`);
};

/**
 * @description Delete group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const DeleteGroup = (req, res, next) => {
  loggerFactory.info(`Function deleteGroup controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupDelete);
  loggerFactory.info(`Function deleteGroup controller has been end`);
};

/**
 * @description Count group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CountGroup = (req, res, next) => {
  loggerFactory.info(`Function countGroup controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupCount);
  loggerFactory.info(`Function countGroup controller has been end`);
};

/**
 * @description Get list members in group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetUsersByGroupName = (req, res, next) => {
  loggerFactory.info(`Function GetUsersByGroupName controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeGroup, constants.actions.MsgActionGroupUsersByGroupName);
  loggerFactory.info(`Function GetUsersByGroupName controller has been end`);
};

module.exports = {
  CreateGroup: CreateGroup,
  GetAllGroup: GetAllGroup,
  GetGroupById: GetGroupById,
  UpdateGroup: UpdateGroup,
  DeleteGroup: DeleteGroup,
  CountGroup: CountGroup,
  GetUsersByGroupName: GetUsersByGroupName,
};

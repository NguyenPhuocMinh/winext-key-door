'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.ROLE_CONTROLLER);

/**
 * @description Create a new role for the realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreateRole = (req, res, next) => {
  loggerFactory.info(`Function createRole controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRole, constants.actions.MsgActionRoleCreate);
  loggerFactory.info(`Function createRole controller has been end`);
};

/**
 * @description Get all roles for the realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetAllRole = (req, res, next) => {
  loggerFactory.info(`Function getAllRole controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRole, constants.actions.MsgActionRoleGetAll);
  loggerFactory.info(`Function getAllRole controller has been end`);
};

/**
 * @description Get role by name controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetRoleByName = (req, res, next) => {
  loggerFactory.info(`Function getRoleByName controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRole, constants.actions.MsgActionRoleGetByName);
  loggerFactory.info(`Function getRoleByName controller has been end`);
};

/**
 * @description Update role by name controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdateRoleByName = (req, res, next) => {
  loggerFactory.info(`Function updateRole controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRole, constants.actions.MsgActionRoleUpdateByName);
  loggerFactory.info(`Function updateRole controller has been end`);
};

/**
 * @description Delete role by name controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const DeleteRoleByName = (req, res, next) => {
  loggerFactory.info(`Function deleteRole controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRole, constants.actions.MsgActionRoleDeleteByName);
  loggerFactory.info(`Function deleteRole controller has been end`);
};

/**
 * @description Get all users in a role by name for the realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetUsersByRoleName = (req, res, next) => {
  loggerFactory.info(`Function getUsersByRoleName controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRole, constants.actions.MsgActionRoleUsersByRoleName);
  loggerFactory.info(`Function getUsersByRoleName controller has been end`);
};

module.exports = {
  CreateRole: CreateRole,
  GetAllRole: GetAllRole,
  GetRoleByName: GetRoleByName,
  UpdateRoleByName: UpdateRoleByName,
  DeleteRoleByName: DeleteRoleByName,
  GetUsersByRoleName: GetUsersByRoleName,
};

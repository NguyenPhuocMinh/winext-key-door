'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.PERMISSION_CONTROLLER);

/**
 * @description Create a new permission controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreatePermission = (req, res, next) => {
  loggerFactory.info(`Function CreatePermission controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypePermission, constants.actions.MsgActionPermissionCreate);
  loggerFactory.info(`Function CreatePermission controller has been end`);
};

/**
 * @description Get all permissions controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetAllPermission = (req, res, next) => {
  loggerFactory.info(`Function GetAllPermission controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypePermission, constants.actions.MsgActionPermissionGetAll);
  loggerFactory.info(`Function GetAllPermission controller has been end`);
};

/**
 * @description Get permission by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetPermissionById = (req, res, next) => {
  loggerFactory.info(`Function GetPermissionById controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypePermission, constants.actions.MsgActionPermissionGetById);
  loggerFactory.info(`Function GetPermissionById controller has been end`);
};

/**
 * @description Update permission by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdatePermission = (req, res, next) => {
  loggerFactory.info(`Function UpdatePermission controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypePermission, constants.actions.MsgActionPermissionUpdate);
  loggerFactory.info(`Function UpdatePermission controller has been end`);
};

/**
 * @description Delete Permission by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const DeletePermission = (req, res, next) => {
  loggerFactory.info(`Function DeletePermission controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypePermission, constants.actions.MsgActionPermissionDelete);
  loggerFactory.info(`Function DeletePermission controller has been end`);
};

/**
 * @description Set Roles To Permission by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const AddRolesToPermission = (req, res, next) => {
  loggerFactory.info(`Function AddRolesToPermission controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypePermission, constants.actions.MsgActionAddRolesToPermission);
  loggerFactory.info(`Function AddRolesToPermission controller has been end`);
};

module.exports = {
  CreatePermission: CreatePermission,
  GetAllPermission: GetAllPermission,
  GetPermissionById: GetPermissionById,
  UpdatePermission: UpdatePermission,
  DeletePermission: DeletePermission,
  AddRolesToPermission: AddRolesToPermission,
};

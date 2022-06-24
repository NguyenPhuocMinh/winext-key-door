'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.USER_CONTROLLER);

/**
 * @description Create user controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreateUser = (req, res, next) => {
  loggerFactory.info(`Function createUser has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionUserCreate);
  loggerFactory.info(`Function createUser has been end`);
};

/**
 * @description Get all user controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetAllUser = (req, res, next) => {
  loggerFactory.info(`Function getAllUser has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionUserGetAll);
  loggerFactory.info(`Function getAllUser has been end`);
};

/**
 * @description Get representation of the user controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetUserById = (req, res, next) => {
  loggerFactory.info(`Function getUserById has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionUserGetById);
  loggerFactory.info(`Function getUserById has been end`);
};

/**
 * @description Update the user controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdateUser = (req, res, next) => {
  loggerFactory.info(`Function updateUser has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionUserUpDate);
  loggerFactory.info(`Function updateUser has been end`);
};

/**
 * @description Delete the user controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const DeleteUser = (req, res, next) => {
  loggerFactory.info(`Function deleteUser has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionUserDelete);
  loggerFactory.info(`Function deleteUser has been end`);
};

/**
 * @description Count users controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CountUsers = (req, res, next) => {
  loggerFactory.info(`Function countUsers has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionUserCount);
  loggerFactory.info(`Function countUsers has been end`);
};

/**
 * @description Get user groups controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetUserGroup = (req, res, next) => {
  loggerFactory.info(`Function groupUser has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionGetUserGroup);
  loggerFactory.info(`Function groupUser has been end`);
};

/**
 * @description Add user to group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const AddUserToGroup = (req, res, next) => {
  loggerFactory.info(`Function addUserToGroup has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionAddUserToGroup);
  loggerFactory.info(`Function addUserToGroup has been end`);
};

/**
 * @description Delete user from group controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const DeleteUserFromGroup = (req, res, next) => {
  loggerFactory.info(`Function deleteUserFromGroup has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionDeleteUserFromGroup);
  loggerFactory.info(`Function deleteUserFromGroup has been end`);
};

/**
 * @description Set up a temporary password for the user User controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const SetUpTemporaryPassword = (req, res, next) => {
  loggerFactory.info(`Function setUpTemporaryPassword has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeUser, constants.actions.MsgActionSetUpTemporaryPassword);
  loggerFactory.info(`Function setUpTemporaryPassword has been end`);
};

module.exports = {
  CreateUser: CreateUser,
  GetAllUser: GetAllUser,
  GetUserById: GetUserById,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser,
  CountUsers: CountUsers,
  GetUserGroup: GetUserGroup,
  AddUserToGroup: AddUserToGroup,
  DeleteUserFromGroup: DeleteUserFromGroup,
  SetUpTemporaryPassword: SetUpTemporaryPassword,
};

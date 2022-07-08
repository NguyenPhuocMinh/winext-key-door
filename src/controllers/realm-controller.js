'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');
const BaseController = require('./base-controller');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.REALM_CONTROLLER);

/**
 * @description Create realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const CreateRealm = (req, res, next) => {
  loggerFactory.info(`Function CreateRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmCreate);
  loggerFactory.info(`Function CreateRealm controller has been end`);
};

/**
 * @description Get all realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetAllRealm = (req, res, next) => {
  loggerFactory.info(`Function GetAllRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmGetAll);
  loggerFactory.info(`Function GetAllRealm controller has been end`);
};

/**
 * @description Get realm by id controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetByIdRealm = (req, res, next) => {
  loggerFactory.info(`Function GetByIdRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmGetById);
  loggerFactory.info(`Function GetByIdRealm controller has been end`);
};

/**
 * @description Update realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const UpdateRealm = (req, res, next) => {
  loggerFactory.info(`Function UpdateRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmUpdate);
  loggerFactory.info(`Function UpdateRealm controller has been end`);
};

/**
 * @description Delete realm controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const DeleteRealm = (req, res, next) => {
  loggerFactory.info(`Function DeleteRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmDelete);
  loggerFactory.info(`Function DeleteRealm controller has been end`);
};

/**
 * @description Get Users InRealm By RealmName Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetUsersInRealmByRealmName = (req, res, next) => {
  loggerFactory.info(`Function DeleteRealm controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmUsersByRealmName);
  loggerFactory.info(`Function DeleteRealm controller has been end`);
};

/**
 * @description Get Groups InRealm By RealmName Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const GetGroupsInRealmByRealmName = (req, res, next) => {
  loggerFactory.info(`Function GetGroupsInRealmByRealmName controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmGroupsByRealmName);
  loggerFactory.info(`Function GetGroupsInRealmByRealmName controller has been end`);
};

/**
 * @description Save Key InRealm By RealmName Controller
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const SaveKeyInRealmByRealmName = (req, res, next) => {
  loggerFactory.info(`Function SaveKeyInRealmByRealmName controller has been start`);
  BaseController({ req, res, next }, constants.types.MsgTypeRealm, constants.actions.MsgActionRealmSaveKeyByRealmName);
  loggerFactory.info(`Function SaveKeyInRealmByRealmName controller has been end`);
};

module.exports = {
  CreateRealm: CreateRealm,
  GetAllRealm: GetAllRealm,
  GetByIdRealm: GetByIdRealm,
  UpdateRealm: UpdateRealm,
  DeleteRealm: DeleteRealm,
  GetUsersInRealmByRealmName: GetUsersInRealmByRealmName,
  GetGroupsInRealmByRealmName: GetGroupsInRealmByRealmName,
  SaveKeyInRealmByRealmName: SaveKeyInRealmByRealmName
};

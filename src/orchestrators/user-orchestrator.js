'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const { assign, isEmpty } = lodash;

// configs
const constants = require('../../constants');

// services
const { redisClient } = require('../../core/services/redis');

// repository
const { sequelize, UserModel, RealmModel } = require('../repository');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.USER_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const CreateUser = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function CreateUser has been end`);

    const { realm } = req.params;
    const { userName } = req.body;

    const slug = slugUtils.parseSlug(userName);

    const isDuplicate = await configureUtils.CheckDuplicate(UserModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateUserName');
    }

    const realmData = await RealmModel.findOne({
      where: {
        name: realm,
      },
      attributes: ['id', 'name'],
    });

    if (isEmpty(realmData)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const values = assign(req.body, {
      realmID: realmData.id,
      realmName: realmData.name,
    });

    const user = await UserModel.create(values, { transaction: t });

    await t.commit();

    await redisClient.del('/users');

    const response = await configureUtils.ConvertDataResponse(user);

    const data = {
      result: {
        response,
      },
      msg: 'CreateUserSuccess',
    };

    loggerFactory.info(`Function CreateUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function CreateUser has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetAllUser = async (toolBox) => {
  const { req } = toolBox;
  const { realm } = req.params;
  try {
    loggerFactory.info(`Function GetAllUser has been start`);

    const users = await UserModel.findAll({
      where: {
        deleted: false,
        realmName: realm,
      },
      include: {
        model: RealmModel,
        as: 'realm',
      },
    });

    const response = await configureUtils.ConvertDataResponses(users);

    const total = users.length;

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetUsersSuccess',
    };

    loggerFactory.info(`Function GetAllUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetAllUser has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetUserById = async (toolBox) => {
  const { req } = toolBox;
  const { realm, id } = req.params;
  try {
    loggerFactory.info(`Function GetUserById has been start`);

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('UserIdNotFound');
    }

    const user = await UserModel.findOne({
      where: {
        id: id,
        deleted: false,
        realmName: realm,
      },
      attributes: ['firstName', 'lastName', 'email'],
    });

    const response = await configureUtils.ConvertDataResponse(user);

    const data = {
      result: {
        response,
      },
      msg: 'GetUserByIDSuccess',
    };

    loggerFactory.info(`Function GetUserById has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetUserById has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateUser = async (toolBox) => {
  const { req } = toolBox;
  const { realm, id } = req.params;
  const { firstName, lastName } = req.body;
  try {
    loggerFactory.info(`Function UpdateUser has been start`);

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('UserIdNotFound');
    }

    const user = await UserModel.findOne({
      where: {
        id: id,
        deleted: false,
        realmName: realm,
      },
      attributes: ['firstName', 'lastName', 'email'],
    });

    const response = await configureUtils.ConvertDataResponse(user);

    const data = {
      result: {
        response,
      },
      msg: 'GetUserByIDSuccess',
    };

    loggerFactory.info(`Function UpdateUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function UpdateUser has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const DeleteUser = (toolBox) => {};

const CountUsers = (toolBox) => {};

const GetUserGroup = (toolBox) => {};

const AddUserToGroup = (toolBox) => {};

const DeleteUserFromGroup = (toolBox) => {};

const SetUpTemporaryPassword = (toolBox) => {};

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

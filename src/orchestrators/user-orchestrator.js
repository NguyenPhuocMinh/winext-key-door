'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const bcrypt = winext.require('bcryptjs');
const logger = require('winext-logger');
const { assign, isEmpty, trim, isEqual } = lodash;

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
const generateUtils = require('../../utils/generate-util');

const CreateUser = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function CreateUser has been end`);

    const { userName, realmName } = req.body;

    const slug = slugUtils.parseSlug(userName);

    const isDuplicate = await configureUtils.CheckDuplicate(UserModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateUserName');
    }

    const realmData = await RealmModel.findOne({
      where: {
        name: realmName,
      },
      attributes: ['id', 'name'],
    });

    if (isEmpty(realmData)) {
      throw errorUtils.BuildNewError('RealmNameNotFound');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const salt = generateUtils.GenerateSalt();

    const values = assign(req.body, {
      realmID: realmData.id,
      realmName: realmData.name,
      password: bcrypt.hashSync(constants.DEFAULT_PASSWORD, salt),
      passwordConfirm: bcrypt.hashSync(constants.DEFAULT_PASSWORD, salt),
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
  try {
    loggerFactory.info(`Function GetAllUser has been start`);

    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const query = configureUtils.CreateFindQuery(req.query, ['realmName']);

    const users = await UserModel.findAll({
      where: query,
      offset: skip,
      limit: limit,
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
  const { id } = req.params;
  try {
    loggerFactory.info(`Function GetUserById has been start`);

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('UserIDNotFound');
    }

    const user = await UserModel.findOne({
      where: {
        id: id,
        deleted: false,
      },
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
        'passwordConfirm',
        'activated',
        'realmName',
        'createdAt',
      ],
    });

    if (isEmpty(user)) {
      throw errorUtils.BuildNewError('UserNotFound');
    }

    const response = await configureUtils.ConvertDataResponse(user, true);

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
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function UpdateUser has been start`);

    const { id } = req.params;
    const { email, firstName, lastName, activated, password, passwordConfirm } = req.body;

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('UserIDNotFound');
    }

    const user = await UserModel.findOne({
      where: {
        id: id,
        deleted: false,
      },
      attributes: ['id', 'email', 'firstName', 'lastName', 'activated', 'password', 'passwordConfirm'],
    });

    if (isEmpty(user)) {
      throw errorUtils.BuildNewError('UserNotFound');
    }

    // details
    user.email = !isEmpty(email) ? trim(email) : '';
    user.firstName = !isEmpty(firstName) ? trim(firstName) : '';
    user.lastName = !isEmpty(lastName) ? trim(lastName) : '';
    user.activated = activated;

    // credentials
    if (!isEqual(password, passwordConfirm)) {
      throw errorUtils.BuildNewError('PasswordConfirmNotMatch');
    }
    const salt = await bcrypt.genSalt(10);

    const userPassword = !isEmpty(password)
      ? bcrypt.hash(trim(password), salt)
      : bcrypt.hash(constants.DEFAULT_PASSWORD, salt);

    const userPasswordConfirm = !isEmpty(passwordConfirm)
      ? bcrypt.hash(trim(passwordConfirm), salt)
      : bcrypt.hash(constants.DEFAULT_PASSWORD, salt);

    user.password = userPassword;
    user.passwordConfirm = userPasswordConfirm;

    await user.save({ transaction: t });
    await t.commit();

    await user.reload({
      attributes: [
        'id',
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
        'passwordConfirm',
        'activated',
        'realmName',
        'createdAt',
      ],
    });

    const response = await configureUtils.ConvertDataResponse(user, true);

    const data = {
      result: {
        response,
      },
      msg: 'UpdateUserByIDSuccess',
    };

    loggerFactory.info(`Function UpdateUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function UpdateUser has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const DeleteUser = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function DeleteUser has been start`);

    const { id } = req.params;

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('UserIDNotFound');
    }

    const user = await UserModel.findOne({
      where: {
        id: id,
        deleted: false,
      },
    });

    if (isEmpty(user)) {
      throw errorUtils.BuildNewError('UserNotFound');
    }

    await user.destroy({ transaction: t });
    await user.reload();

    await t.commit();

    const data = {
      msg: 'DeleteUserSuccess',
    };

    loggerFactory.info(`Function DeleteUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function DeleteUser has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

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

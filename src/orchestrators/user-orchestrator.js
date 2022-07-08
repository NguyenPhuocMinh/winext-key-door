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
const {
  sequelize,
  UserModel,
  RealmModel,
  RoleModel,
  GroupModel,
  UserHasRoleModel,
  GroupHasUserModel,
} = require('../repository');

// dto
const { userDTO } = require('../dto');

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
  try {
    loggerFactory.info(`Function GetAllUser has been start`);

    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const query = configureUtils.CreateFindQuery(req.query, ['realmName']);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: users } = await UserModel.findAndCountAll({
      where: query,
      offset: skip,
      limit: limit,
      order: order,
    });

    const response = await configureUtils.ConvertDataResponses(users);

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

    const user = await findOneUser(id);

    const response = await userDTO(user);

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

    const user = await findOneUser(id);

    req.body = configureUtils.AttributeFilter(req.body);
    const { email, firstName, lastName, activated, password, passwordConfirm, updatedAt, updatedBy } = req.body;

    // details
    user.email = !isEmpty(email) ? trim(email) : user.email;
    user.firstName = !isEmpty(firstName) ? trim(firstName) : user.firstName;
    user.lastName = !isEmpty(lastName) ? trim(lastName) : user.lastName;
    user.activated = activated;

    // credentials
    const salt = generateUtils.GenerateSalt();

    if (!isEmpty(password) && !isEmpty(passwordConfirm)) {
      if (!isEqual(password, passwordConfirm)) {
        throw errorUtils.BuildNewError('PasswordConfirmNotMatch');
      }
      const userPassword = bcrypt.hashSync(trim(password), salt);
      const userPasswordConfirm = bcrypt.hashSync(trim(passwordConfirm), salt);

      user.password = userPassword;
      user.passwordConfirm = userPasswordConfirm;
      user.expiredTemporary = 86400 * 60; // 2 months
    }
    user.updatedAt = updatedAt;
    user.updatedBy = updatedBy;

    await user.save({ transaction: t });
    await t.commit();

    await user.reload();

    const response = await userDTO(user);

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

    const user = await findOneUser(id);

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

const AddRolesToUser = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function AddRolesToUser has been start`);

    const { id } = req.params;
    const { assignedRoles } = req.body;

    const user = await findOneUser(id);

    // roles
    if (!isEmpty(assignedRoles)) {
      await UserHasRoleModel.destroy({
        where: {
          userID: user.id,
        },
        force: true,
        transaction: t,
      });

      const mappingRoles = assignedRoles.map((role) => {
        return {
          userID: user.id,
          roleID: role.id,
        };
      });

      await UserHasRoleModel.bulkCreate(mappingRoles, { transaction: t });
    }

    await user.save({ transaction: t });
    await t.commit();

    await user.reload();

    const response = await userDTO(user);

    const data = {
      result: {
        response,
      },
      msg: 'AddRolesToUserSuccess',
    };

    loggerFactory.info(`Function AddRolesToUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function AddRolesToUser has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const AddGroupsToUser = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function AddGroupsToUser has been start`);

    const { id } = req.params;
    const { assignedGroups } = req.body;

    const user = await findOneUser(id);

    // roles
    if (!isEmpty(assignedGroups)) {
      await GroupHasUserModel.destroy({
        where: {
          userID: user.id,
        },
        force: true,
        transaction: t,
      });

      const mappingGroups = assignedGroups.map((group) => {
        return {
          userID: user.id,
          groupID: group.id,
        };
      });

      await GroupHasUserModel.bulkCreate(mappingGroups, { transaction: t });
    }

    await user.save({ transaction: t });
    await t.commit();

    await user.reload();

    const response = await userDTO(user);

    const data = {
      result: {
        response,
      },
      msg: 'AddGroupsToUserSuccess',
    };

    loggerFactory.info(`Function AddGroupsToUser has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function AddGroupsToUser has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const SetUpTemporaryPassword = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function SetUpTemporaryPassword has been start`);

    const { id } = req.params;
    req.body = configureUtils.AttributeFilter(req.body);
    const { generatePass, updatedAt, updatedBy } = req.body;

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('UserIDNotFound');
    }

    const user = await UserModel.findOne({
      where: {
        id: id,
        deleted: false,
      },
      attributes: ['id', 'password', 'passwordConfirm'],
    });

    if (isEmpty(user)) {
      throw errorUtils.BuildNewError('UserNotFound');
    }

    const salt = generateUtils.GenerateSalt();
    const generateString = generateUtils.GenerateRandomString();

    if (generatePass) {
      // for expiredTime and not set new pass
      user.password = bcrypt.hashSync(generateString, salt);
      user.passwordConfirm = bcrypt.hashSync(generateString, salt);
      user.expiredTemporary = 86400 * 60; // 2 months
    } else {
      // for create once
      user.password = bcrypt.hashSync(constants.DEFAULT_PASSWORD, salt);
      user.passwordConfirm = bcrypt.hashSync(constants.DEFAULT_PASSWORD, salt);
      user.expiredTemporary = 86400;
    }

    user.updatedAt = updatedAt;
    user.updatedBy = updatedBy;

    await user.save({ transaction: t });
    await user.reload();

    await t.commit();

    const data = {
      msg: 'SetTemporaryPasswordUserSuccess',
    };

    loggerFactory.info(`Function SetUpTemporaryPassword has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function SetUpTemporaryPassword has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const findOneUser = async (id) => {
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
      'email',
      'userName',
      'firstName',
      'lastName',
      'activated',
      'password',
      'passwordConfirm',
      'realmName',
      'createdAt',
    ],
    include: [
      {
        model: RealmModel,
        as: 'realm',
        attributes: ['id', 'name'],
        include: [
          {
            model: GroupModel,
            as: 'groups',
            attributes: ['id', 'name'],
          },
        ],
      },
      {
        model: RoleModel,
        as: 'roles',
        attributes: ['id', 'name'],
      },
      {
        model: GroupModel,
        as: 'groups',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (isEmpty(user)) {
    throw errorUtils.BuildNewError('UserNotFound');
  }

  return user;
};

module.exports = {
  CreateUser: CreateUser,
  GetAllUser: GetAllUser,
  GetUserById: GetUserById,
  UpdateUser: UpdateUser,
  DeleteUser: DeleteUser,
  AddRolesToUser: AddRolesToUser,
  AddGroupsToUser: AddGroupsToUser,
  SetUpTemporaryPassword: SetUpTemporaryPassword,
};

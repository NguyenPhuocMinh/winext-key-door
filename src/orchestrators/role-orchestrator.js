'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');
const { isEmpty } = lodash;

// services
const { redisClient } = require('../../core/services/redis');

// repository
const { sequelize, RoleModel, UserModel, PermissionModel } = require('../repository');

// dto
const { roleDTO } = require('../dto');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.ROLE_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const CreateRole = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function CreateRole has been start`);

    const { name } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(RoleModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateRoleName');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const role = await RoleModel.create(req.body, {
      transaction: t,
    });

    await t.commit();

    const response = await configureUtils.ConvertDataResponse(role);

    const data = {
      result: {
        response,
      },
      msg: 'CreateRoleSuccess',
    };

    loggerFactory.info(`Function CreateRole has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function CreateRole has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetAllRole = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetAllRole has been start`);

    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const query = configureUtils.CreateFindQuery(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: roles } = await RoleModel.findAndCountAll({
      where: query,
      offset: skip,
      limit: limit,
      order: order,
    });

    const response = await configureUtils.ConvertDataResponses(roles);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetRolesSuccess',
    };

    loggerFactory.info(`Function GetAllRole has been end`);
    return data;
  } catch (err) {
    loggerFactory.error(`Function GetAllRole has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetRoleById = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetRoleById has been start`);

    const { id } = req.params;

    const role = await findOneRole(id);

    const response = await roleDTO(role);

    const data = {
      result: {
        response,
      },
      msg: 'GetRoleByIDSuccess',
    };

    loggerFactory.info(`Function GetRoleById has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetRoleById has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateRole = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function UpdateRole has been start`);

    const { id } = req.params;

    const role = await findOneRole(id);

    req.body = configureUtils.AttributeFilter(req.body);
    const { description, updatedAt, updatedBy } = req.body;

    role.description = description;
    role.updatedAt = updatedAt;
    role.updatedBy = updatedBy;

    await role.save({ transaction: t });
    await t.commit();

    await role.reload();

    const response = await roleDTO(id);

    const data = {
      result: {
        response,
      },
      msg: 'UpdateRoleSuccess',
    };

    loggerFactory.info(`Function UpdateRole has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function UpdateRole has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetRoleByName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetRoleByName has been start`);

    const { realm } = req.params;

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    const role = await RoleModel.findOne({
      where: {
        deleted: false,
        realmName: realm,
      },
    });

    const response = await configureUtils.ConvertDataResponse(role);

    const data = {
      result: {
        response,
      },
      msg: 'GetRolesSuccess',
    };
    loggerFactory.info(`Function GetRoleByName has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetRoleByName has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateRoleByName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function UpdateRealm has been start`);
    loggerFactory.info(`Function UpdateRealm has been end`);
  } catch (err) {
    loggerFactory.error(`Function UpdateRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const DeleteRoleByName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function DeleteRealm has been start`);
    loggerFactory.info(`Function DeleteRealm has been end`);
  } catch (err) {
    loggerFactory.error(`Function DeleteRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetUsersByRoleName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetUsersByRoleName has been start`);

    const { roleName } = req.params;
    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: users } = await UserModel.findAndCountAll({
      include: [
        {
          model: RoleModel,
          as: 'roles',
          where: {
            name: roleName,
          },
        },
      ],
      offset: skip,
      limit: limit,
      order: order,
      attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'createdAt'],
    });

    const response = await configureUtils.ConvertDataResponses(users);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetUsersInRoleSuccess',
    };

    loggerFactory.info(`Function GetUsersByRoleName has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetUsersByRoleName has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetPermissionsByRoleName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetPermissionsByRoleName has been start`);

    const { roleName } = req.params;
    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: permissions } = await PermissionModel.findAndCountAll({
      include: [
        {
          model: RoleModel,
          as: 'roles',
          where: {
            name: roleName,
          },
        },
      ],
      offset: skip,
      limit: limit,
      order: order,
      attributes: ['id', 'name', 'description', 'createdAt'],
    });

    const response = await configureUtils.ConvertDataResponses(permissions);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetPermissionsInRoleSuccess',
    };

    loggerFactory.info(`Function GetPermissionsByRoleName has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetPermissionsByRoleName has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const findOneRole = async (id) => {
  if (isEmpty(id)) {
    throw errorUtils.BuildNewError('RoleIDNotFound');
  }

  const role = await RoleModel.findOne({
    where: {
      id: id,
      deleted: false,
    },
    attributes: ['id', 'name', 'description', 'activated', 'createdAt'],
    include: [
      {
        model: UserModel,
        as: 'users',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
      {
        model: PermissionModel,
        as: 'permissions',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (isEmpty(role)) {
    throw errorUtils.BuildNewError('RoleNotFound');
  }

  return role;
};

module.exports = {
  CreateRole: CreateRole,
  GetAllRole: GetAllRole,
  GetRoleById: GetRoleById,
  UpdateRole: UpdateRole,
  GetRoleByName: GetRoleByName,
  UpdateRoleByName: UpdateRoleByName,
  DeleteRoleByName: DeleteRoleByName,
  GetUsersByRoleName: GetUsersByRoleName,
  GetPermissionsByRoleName: GetPermissionsByRoleName,
};

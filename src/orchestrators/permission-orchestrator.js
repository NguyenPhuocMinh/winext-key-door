'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');
const { isEmpty, toUpper } = lodash;

// services
const { redisClient } = require('../../core/services/redis');

// repository
const { sequelize, PermissionModel, RoleModel, RoleHasPermissionModel } = require('../repository');

// dto
const { permissionDTO } = require('../dto');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.PERMISSION_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const CreatePermission = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function CreatePermission has been start`);

    const { name } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(PermissionModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicatePermissionName');
    }

    req.body.slug = slug;
    req.body.name = toUpper(name.trim());
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const permission = await PermissionModel.create(req.body, {
      transaction: t,
    });

    await t.commit();

    const response = await configureUtils.ConvertDataResponse(permission);

    const data = {
      result: {
        response,
      },
      msg: 'CreatePermissionSuccess',
    };

    loggerFactory.info(`Function CreatePermission has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function CreatePermission has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetAllPermission = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetAllPermission has been start`);

    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const query = configureUtils.CreateFindQuery(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const Permissions = await PermissionModel.findAll({
      where: query,
      offset: skip,
      limit: limit,
      order: order,
    });

    const response = await configureUtils.ConvertDataResponses(Permissions);

    const total = Permissions.length;

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetPermissionsSuccess',
    };

    loggerFactory.info(`Function GetAllPermission has been end`);
    return data;
  } catch (err) {
    loggerFactory.error(`Function GetAllPermission has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetPermissionById = async (toolBox) => {
  const { req } = toolBox;
  const { id } = req.params;
  try {
    loggerFactory.info(`Function GetPermissionById has been start`);

    const permission = await getPermissionID(id);

    const response = await permissionDTO(permission);

    const data = {
      result: {
        response,
      },
      msg: 'GetPermissionIDSuccess',
    };

    loggerFactory.info(`Function GetPermissionById has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetPermissionById has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdatePermission = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function UpdatePermission has been start`);
    const { id } = req.params;

    const permission = await getPermissionID(id);

    req.body = configureUtils.AttributeFilter(req.body);
    const { name, description, updatedAt, updatedBy } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(PermissionModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicatePermissionName');
    }

    permission.name = toUpper(name);
    permission.slug = slug;
    permission.description = description;
    permission.updatedAt = updatedAt;
    permission.updatedBy = updatedBy;

    await permission.save({ transaction: t });
    await t.commit();

    await permission.reload();

    const response = await permissionDTO(permission);

    const data = {
      result: {
        response,
      },
      msg: 'UpdatePermissionSuccess',
    };

    loggerFactory.info(`Function UpdatePermission has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function UpdatePermission has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const DeletePermission = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function DeletePermission has been start`);

    const { id } = req.params;

    const permission = await getPermissionID(id);

    await permission.destroy({ transaction: t });
    await permission.reload();

    await t.commit();

    const data = {
      msg: 'DeletePermissionSuccess',
    };

    loggerFactory.info(`Function DeletePermission has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function DeletePermission has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const AddRolesToPermission = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function AddRolesToPermission has been start`);
    const { id } = req.params;

    const permission = await getPermissionID(id);

    req.body = configureUtils.AttributeFilter(req.body);
    const { assignedRoles, updatedAt, updatedBy } = req.body;

    if (!isEmpty(assignedRoles)) {
      await RoleHasPermissionModel.destroy({
        where: {
          perID: permission.id,
        },
        force: true,
        transaction: t,
      });

      const mappingRoles = assignedRoles.map((role) => {
        return {
          perID: permission.id,
          roleID: role.id,
        };
      });

      await RoleHasPermissionModel.bulkCreate(mappingRoles, { transaction: t });

      permission.updatedAt = updatedAt;
      permission.updatedBy = updatedBy;
    }

    await permission.save({ transaction: t });
    await t.commit();

    await permission.reload();

    const response = await permissionDTO(permission);

    const data = {
      result: {
        response,
      },
      msg: 'AddRolesToPermissionSuccess',
    };

    loggerFactory.info(`Function AddRolesToPermission has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function AddRolesToPermission has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const getPermissionID = async (id) => {
  if (isEmpty(id)) {
    throw errorUtils.BuildNewError('PermissionIDNotFound');
  }

  const permission = await PermissionModel.findOne({
    where: {
      id: id,
      deleted: false,
    },
    attributes: ['id', 'name', 'description', 'activated', 'createdAt'],
    include: [
      {
        model: RoleModel,
        as: 'roles',
        attributes: ['id', 'name'],
      },
    ],
  });

  if (isEmpty(permission)) {
    throw errorUtils.BuildNewError('PermissionNotFound');
  }

  return permission;
};

module.exports = {
  CreatePermission: CreatePermission,
  GetAllPermission: GetAllPermission,
  GetPermissionById: GetPermissionById,
  UpdatePermission: UpdatePermission,
  DeletePermission: DeletePermission,
  AddRolesToPermission: AddRolesToPermission,
};

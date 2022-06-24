'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');
const { toNumber, assign, isEmpty } = lodash;

// services
const { redisClient } = require('../../core/services/redis');

// repository
const { sequelize, RoleModel, RealmModel } = require('../repository');

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

    const { realm } = req.params;
    const { name } = req.body;

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    const realmData = await RealmModel.findOne({
      where: {
        name: realm,
      },
      attributes: ['id', 'name'],
    });

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(RoleModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateRoleName');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const values = assign(req.body, {
      realmID: realmData.id,
      realmName: realmData.name,
    });

    const role = await RoleModel.create(values, {
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
    const { limit, page } = req.query;

    const roles = await RoleModel.findAll({
      where: {
        deleted: false,
      },
      limit: limit ? toNumber(limit) : constants.DEFAULT_LIMIT,
      offset: page ? toNumber(page) : constants.DEFAULT_PAGE,
      order: [['createdAt', 'ASC']],
    });

    const response = await configureUtils.ConvertDataResponses(roles);

    const total = roles.length;

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

const GetRoleByName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetRoleByName has been start`);

    const { realm } = req.params;
    console.log('🚀 ~ file: role-orchestrator.js ~ line 129 ~ GetRoleByName ~ req.params', req.params);

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

const GetUsersByRoleName = (toolBox) => {};

module.exports = {
  CreateRole: CreateRole,
  GetAllRole: GetAllRole,
  GetRoleByName: GetRoleByName,
  UpdateRoleByName: UpdateRoleByName,
  DeleteRoleByName: DeleteRoleByName,
  GetUsersByRoleName: GetUsersByRoleName,
};

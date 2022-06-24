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
const { sequelize, TokenModel } = require('../repository');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.TOKEN_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const CreateToken = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function CreateToken has been start`);

    const { realm } = req.params;
    const { name } = req.body;

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    const realmData = await TokenModel.findOne({
      where: {
        name: realm,
      },
      attributes: ['id', 'name'],
    });

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(TokenModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateRoleName');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const values = assign(req.body, {
      realmID: realmData.id,
      realmName: realmData.name,
    });

    const role = await TokenModel.create(values, {
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

    loggerFactory.info(`Function CreateToken has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function CreateToken has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetTokenById = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetTokenById has been start`);

    const { realm } = req.params;
    console.log('🚀 ~ file: role-orchestrator.js ~ line 129 ~ GetRoleByName ~ req.params', req.params);

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    const role = await TokenModel.findOne({
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
    loggerFactory.info(`Function GetTokenById has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetTokenById has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateTokenById = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function UpdateTokenById has been start`);
    loggerFactory.info(`Function UpdateTokenById has been end`);
  } catch (err) {
    loggerFactory.error(`Function UpdateTokenById has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

module.exports = {
  CreateToken: CreateToken,
  GetTokenById: GetTokenById,
  UpdateTokenById: UpdateTokenById,
};

'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const { isEmpty } = lodash;

// configs
const constants = require('../../constants');

// services
const { redisClient } = require('../../core/services/redis');

// repository
const { sequelize, KeyModel } = require('../repository');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.KEY_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const CreateKey = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();

  try {
    loggerFactory.info(`Function CreateKey has been start`);
    const { name } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(KeyModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateKeyName');
    }
    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const realm = await KeyModel.create(req.body, { transaction: t });

    await t.commit();

    const response = await configureUtils.ConvertDataResponse(realm);

    const data = {
      result: {
        response,
      },
      msg: 'CreateKeySuccess',
    };

    loggerFactory.info(`Function CreateKey has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function CreateKey has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetByIdKey = async (toolBox) => {
  const { req } = toolBox;

  try {
    loggerFactory.info(`Function GetByIdKey has been start`);
    const { id } = req.params;

    if (!isEmpty(id)) {
      throw errorUtils.BuildNewError('KeyIdNotFound');
    }

    const realm = await KeyModel.findOne({
      where: {
        id: id,
      },
    });

    const response = await configureUtils.ConvertDataResponse(realm);

    const data = {
      result: {
        response,
      },
      msg: 'GetKeyByIDSuccess',
    };

    loggerFactory.info(`Function GetByIdKey has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetByIdKey has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateKey = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();

  try {
    loggerFactory.info(`Function UpdateKey has been start`);
    const { id } = req.params;
    const { name, titleName } = req.body;

    if (!isEmpty(id)) {
      throw errorUtils.BuildNewError('KeyIdNotFound');
    }

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(KeyModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateKeyName');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body);

    const realm = await KeyModel.findOne({
      where: {
        id,
      },
    });

    realm.titleName = titleName;

    await realm.save({ fields: ['titleName'], transaction: t });
    await t.commit();

    await realm.reload();

    const response = await configureUtils.ConvertDataResponse(realm);

    const data = {
      result: {
        response,
      },
      msg: 'UpdateKeySuccess',
    };

    loggerFactory.info(`Function UpdateKey has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function UpdateKey has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

module.exports = {
  CreateKey: CreateKey,
  GetByIdKey: GetByIdKey,
  UpdateKey: UpdateKey,
};

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
const { sequelize, KeyModel, RealmModel } = require('../repository');

// dto
const { keyDTO } = require('../dto');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.KEY_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const SaveKeyByRealm = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();

  try {
    loggerFactory.info(`Function SaveKeyByRealm has been start`);
    const { realm } = req.params;
    const { name } = req.body;

    const realmData = await RealmModel.findOne({
      where: {
        name: realm,
      },
      attributes: ['id', 'name'],
    });

    if (isEmpty(realmData)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    const slug = slugUtils.parseSlug(name);

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const [key, created] = await KeyModel.findOrCreate({
      where: {
        realmName: realm,
      },
      defaults: {
        ...req.body,
        realmID: realmData.id,
        realmName: realmData.name,
      },
      transaction: t,
    });

    if (!created) {
      req.body = configureUtils.AttributeFilter(req.body);

      const { name, slug, priority, keySize, algorithm, activated, updatedAt, updatedBy } = req.body;

      key.name = name;
      key.slug = slug;
      key.priority = priority;
      key.keySize = keySize;
      key.algorithm = algorithm;
      key.activated = activated;
      key.updatedAt = updatedAt;
      key.updatedBy = updatedBy;
    }

    await key.save({ transaction: t });
    await t.commit();

    await key.reload();

    const response = await keyDTO(key);

    const data = {
      result: {
        response,
      },
      msg: 'SaveKeyByRealmSuccess',
    };

    loggerFactory.info(`Function SaveKeyByRealm has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function SaveKeyByRealm has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetKeyByRealm = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetKeyByRealm has been start`);

    const { realm } = req.params;

    const key = await fineOneKey(realm);

    const response = await keyDTO(key);

    const data = {
      result: {
        response,
      },
      msg: 'GetKeyByRealmSuccess',
    };

    loggerFactory.info(`Function GetKeyByRealm has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetKeyByRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const fineOneKey = async (realm) => {
  if (isEmpty(realm)) {
    throw errorUtils.BuildNewError('RealmNotFound');
  }

  const key = await KeyModel.findOne({
    where: {
      realmName: realm,
    },
    attributes: ['name', 'useFor', 'priority', 'keySize', 'algorithm', 'activated'],
  });

  if (isEmpty(key)) {
    throw errorUtils.BuildNewError('KeyNotFound');
  }

  return key;
};

module.exports = {
  SaveKeyByRealm: SaveKeyByRealm,
  GetKeyByRealm: GetKeyByRealm,
};

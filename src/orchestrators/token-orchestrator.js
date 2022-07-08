'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');
const { isEmpty } = lodash;

// repository
const { sequelize, TokenModel, RealmModel } = require('../repository');

// dto
const { tokenDTO } = require('../dto');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.TOKEN_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const SaveTokenByRealm = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function SaveTokenByRealm has been start`);

    const { realm } = req.params;

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
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

    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const [token, created] = await TokenModel.findOrCreate({
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

      const { signatureAlgorithm, expired, updatedAt, updatedBy } = req.body;

      token.signatureAlgorithm = signatureAlgorithm;
      token.expired = expired;
      token.updatedAt = updatedAt;
      token.updatedBy = updatedBy;
    }

    await token.save({ transaction: t });
    await t.commit();

    await token.reload();

    const response = await tokenDTO(token);

    const data = {
      result: {
        response,
      },
      msg: 'SaveTokenByRealmSuccess',
    };

    loggerFactory.info(`Function SaveTokenByRealm has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function SaveTokenByRealm has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetTokenByRealm = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetTokenByRealm has been start`);

    const { realm } = req.params;

    const token = await fineOneToken(realm);

    const response = await tokenDTO(token);

    const data = {
      result: {
        response,
      },
      msg: 'GetTokenByRealmSuccess',
    };

    loggerFactory.info(`Function GetTokenByRealm has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function GetTokenByRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const fineOneToken = async (realm) => {
  if (isEmpty(realm)) {
    throw errorUtils.BuildNewError('RealmNotFound');
  }

  const token = await TokenModel.findOne({
    where: {
      realmName: realm,
    },
    attributes: ['signatureAlgorithm', 'expired'],
  });

  return token;
};

module.exports = {
  SaveTokenByRealm: SaveTokenByRealm,
  GetTokenByRealm: GetTokenByRealm,
};

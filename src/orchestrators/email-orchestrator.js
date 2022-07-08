'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');
const { isEmpty } = lodash;

// repository
const { sequelize, EmailModel, RealmModel } = require('../repository');

// dto
const { emailDTO } = require('../dto');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.EMAIL_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const SaveEmailByRealm = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function SaveEmailByRealm has been start`);
    const { realm } = req.params;

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

    const [email, created] = await EmailModel.findOrCreate({
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

      const {
        host,
        port,
        from,
        fromDisplayName,
        replyTo,
        replyToDisplayName,
        enableSSL,
        enableStartTLS,
        enableAuthentication,
        updatedAt,
        updatedBy,
      } = req.body;

      email.host = host;
      email.port = port;
      email.from = from;
      email.fromDisplayName = fromDisplayName;
      email.replyTo = replyTo;
      email.replyToDisplayName = replyToDisplayName;
      email.enableSSL = enableSSL;
      email.enableStartTLS = enableStartTLS;
      email.enableAuthentication = enableAuthentication;
      email.updatedAt = updatedAt;
      email.updatedBy = updatedBy;
    }

    await email.save({ transaction: t });
    await t.commit();

    await email.reload();

    const response = await emailDTO(email);

    const data = {
      result: {
        response,
      },
      msg: 'SaveEmailByRealmSuccess',
    };

    loggerFactory.info(`Function SaveEmailByRealm has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function SaveEmailByRealm has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetEmailByRealm = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetKeyByRealm has been start`);

    const { realm } = req.params;

    const email = await fineOneEmail(realm);

    const response = await emailDTO(email);

    const data = {
      result: {
        response,
      },
      msg: 'GetEmailByRealmSuccess',
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

const fineOneEmail = async (realm) => {
  if (isEmpty(realm)) {
    throw errorUtils.BuildNewError('RealmNotFound');
  }

  const email = await EmailModel.findOne({
    where: {
      realmName: realm,
    },
    attributes: [
      'host',
      'port',
      'from',
      'fromDisplayName',
      'replyTo',
      'replyToDisplayName',
      'enableSSL',
      'enableStartTLS',
      'enableAuthentication',
    ],
  });

  return email;
};

module.exports = {
  SaveEmailByRealm: SaveEmailByRealm,
  GetEmailByRealm: GetEmailByRealm,
};

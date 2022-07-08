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
const { sequelize, RealmModel, KeyModel, EmailModel, TokenModel, UserModel, GroupModel } = require('../repository');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.REALM_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');
const { realmDTO } = require('../dto');

const CreateRealm = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();

  try {
    loggerFactory.info(`Function CreateRealm has been start`);
    const { name } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(RealmModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateRealmName');
    }
    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body, 'create');

    const realm = await RealmModel.create(req.body, { transaction: t });

    await t.commit();

    await redisClient.del('/realms');

    const response = await configureUtils.ConvertDataResponse(realm);

    const data = {
      result: {
        response,
      },
      msg: 'CreateRealmSuccess',
    };

    loggerFactory.info(`Function CreateRealm has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function CreateRealm has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetAllRealm = async (toolBox) => {
  const { req } = toolBox;

  try {
    loggerFactory.info(`Function GetAllRealm has been start`);

    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const query = configureUtils.CreateFindQuery(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: realms } = await RealmModel.findAndCountAll({
      where: query,
      limit: limit,
      offset: skip,
      order: order,
      attributes: ['id', 'name', 'titleName', 'activated', 'createdAt'],
    });

    const response = await configureUtils.ConvertDataResponses(realms, true);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetRealmsSuccess',
    };

    loggerFactory.info(`Function GetAllRealm has been end`);

    await redisClient.setEx('/realms', 900, JSON.stringify(data));

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetAllRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetByIdRealm = async (toolBox) => {
  const { req } = toolBox;

  try {
    loggerFactory.info(`Function GetByIdRealm has been start`);
    const { id } = req.params;

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('RealmIDNotFound');
    }

    const realm = await getRealmID(id);

    const response = await realmDTO(realm);

    const data = {
      result: {
        response,
      },
      msg: 'GetRealmByIDSuccess',
    };

    loggerFactory.info(`Function GetByIdRealm has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetByIdRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateRealm = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();

  try {
    loggerFactory.info(`Function UpdateRealm has been start`);
    const { id } = req.params;
    const { name, titleName } = req.body;

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('RealmIDNotFound');
    }

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(RealmModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateRealmName');
    }

    req.body.slug = slug;
    req.body = configureUtils.AttributeFilter(req.body);

    const realm = await RealmModel.findOne({
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
      msg: 'UpdateRealmSuccess',
    };

    loggerFactory.info(`Function UpdateRealm has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function UpdateRealm has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const DeleteRealm = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();

  try {
    loggerFactory.info(`Function DeleteRealm has been start`);

    const { id } = req.params;

    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('RealmIDNotFound');
    }

    const realm = await RealmModel.findOne({
      where: {
        id,
      },
      attributes: ['id', 'name', 'titleName', 'deleted', 'activated', 'createdAt'],
    });

    if (isEmpty(realm)) {
      throw errorUtils.BuildNewError('RealmNotFound');
    }

    await realm.destroy({ transaction: t });
    await realm.reload();

    await t.commit();

    const data = {
      msg: 'DeleteRealmSuccess',
    };

    loggerFactory.info(`Function DeleteRealm has been end`);

    return data;
  } catch (err) {
    loggerFactory.error(`Function DeleteRealm has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetUsersByRealmName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetUsersByRealmName has been start`);

    const { realmName } = req.params;
    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: users } = await UserModel.findAndCountAll({
      where: {
        realmName: realmName,
      },
      offset: skip,
      limit: limit,
      order: order,
      attributes: ['id', 'userName', 'firstName', 'lastName', 'email', 'activated', 'createdAt'],
    });

    const response = await configureUtils.ConvertDataResponses(users);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetUsersByRealmNameSuccess',
    };
    loggerFactory.info(`Function GetUsersByRealmName has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetUsersByRealmName has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetGroupsByRealmName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetGroupsByRealmName has been start`);

    const { realmName } = req.params;
    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: groups } = await GroupModel.findAndCountAll({
      where: {
        realmName: realmName,
      },
      offset: skip,
      limit: limit,
      order: order,
      attributes: ['id', 'name', 'activated', 'createdAt'],
    });

    const response = await configureUtils.ConvertDataResponses(groups);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetGroupsByRealmNameSuccess',
    };
    loggerFactory.info(`Function GetGroupsByRealmName has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetGroupsByRealmName has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const getRealmID = async (id) => {
  if (isEmpty(id)) {
    throw errorUtils.BuildNewError('RealmIDNotFound');
  }

  const realm = await RealmModel.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: KeyModel,
        as: 'key',
        attributes: ['name', 'priority', 'useFor', 'keySize', 'algorithm', 'activated'],
      },
      {
        model: EmailModel,
        as: 'email',
        attributes: [
          'host',
          'port',
          'fromDisplayName',
          'from',
          'replyToDisplayName',
          'replyTo',
          'enableSSL',
          'enableStartTLS',
          'enableAuthentication',
        ],
      },
      {
        model: TokenModel,
        as: 'token',
        attributes: ['signatureAlgorithm', 'expired'],
      },
    ],
  });

  if (isEmpty(realm)) {
    throw errorUtils.BuildNewError('RealmNotFound');
  }

  return realm;
};

module.exports = {
  CreateRealm: CreateRealm,
  GetAllRealm: GetAllRealm,
  GetByIdRealm: GetByIdRealm,
  UpdateRealm: UpdateRealm,
  DeleteRealm: DeleteRealm,
  GetUsersByRealmName: GetUsersByRealmName,
  GetGroupsByRealmName: GetGroupsByRealmName,
};

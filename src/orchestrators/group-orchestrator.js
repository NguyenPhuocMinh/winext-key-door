'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const { isEmpty, assign } = lodash;

// configs
const constants = require('../../constants');

// services
const { redisClient } = require('../../core/services/redis');

// repository
const { sequelize, GroupModel, RealmModel, UserModel } = require('../repository');

// dto
const { groupDTO } = require('../dto');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.GROUP_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const CreateGroup = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function CreateGroup has been end`);

    const { name, realmName } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(GroupModel, { slug, realmName });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateGroupOrRealmName');
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

    const group = await GroupModel.create(values, { transaction: t });

    await t.commit();

    await redisClient.del('/groups');

    const response = await configureUtils.ConvertDataResponse(group);

    const data = {
      result: {
        response,
      },
      msg: 'CreateGroupSuccess',
    };

    loggerFactory.info(`Function CreateGroup has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function CreateGroup has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const GetAllGroup = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetAllGroup has been start`);

    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const query = configureUtils.CreateFindQuery(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: groups } = await GroupModel.findAndCountAll({
      where: query,
      offset: skip,
      limit: limit,
      order: order,
    });

    const response = await configureUtils.ConvertDataResponses(groups);

    const data = {
      result: {
        response,
        total,
      },
      msg: 'GetGroupsSuccess',
    };

    loggerFactory.info(`Function GetAllGroup has been end`);
    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetAllGroup has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetGroupById = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetGroupById has been start`);
    const { id } = req.params;

    const group = await getGroupID(id);

    const response = await groupDTO(group);

    const data = {
      result: {
        response,
      },
      msg: 'GetGroupIDSuccess',
    };

    loggerFactory.info(`Function GetGroupById has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetGroupById has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateGroup = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function UpdateGroup has been start`);

    const { id } = req.params;
    const group = await getGroupID(id);

    req.body = configureUtils.AttributeFilter(req.body);

    const { name, activated, updatedAt, updatedBy } = req.body;

    const slug = slugUtils.parseSlug(name);

    const isDuplicate = await configureUtils.CheckDuplicate(GroupModel, { slug });

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateGroupName');
    }

    group.name = name;
    group.slug = slug;
    group.activated = activated;
    group.updatedAt = updatedAt;
    group.updatedBy = updatedBy;

    await group.save({ transaction: t });
    await t.commit();

    await group.reload();

    const response = await groupDTO(group);

    const data = {
      result: {
        response,
      },
      msg: 'UpdateGroupSuccess',
    };

    loggerFactory.info(`Function UpdateGroup has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function UpdateGroup has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const DeleteGroup = async (toolBox) => {
  const { req } = toolBox;
  const t = await sequelize.transaction();
  try {
    loggerFactory.info(`Function DeleteGroup has been start`);

    const { id } = req.params;

    const group = await getGroupID(id);

    await group.destroy({ transaction: t });
    await group.reload();

    await t.commit();

    const data = {
      msg: 'DeleteGroupSuccess',
    };

    loggerFactory.info(`Function DeleteGroup has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function DeleteGroup has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const CountGroup = (toolBox) => {};

const GetUsersByGroupName = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetUsersByGroupName has been start`);

    const { groupName, realmName } = req.params;
    const { skip, limit } = configureUtils.CreateFilterPagination(req.query);
    const order = configureUtils.CreateOrderQuery(req.query);

    const { count: total, rows: users } = await UserModel.findAndCountAll({
      include: [
        {
          model: GroupModel,
          as: 'groups',
          where: {
            name: groupName,
            realmName: realmName,
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
      msg: 'GetUsersByGroupNameSuccess',
    };
    loggerFactory.info(`Function GetUsersByGroupName has been end`);

    return data;
  } catch (err) {
    console.error(err);
    loggerFactory.error(`Function GetUsersByGroupName has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const getGroupID = async (id) => {
  try {
    if (isEmpty(id)) {
      throw errorUtils.BuildNewError('GroupIDNotFound');
    }

    const group = await GroupModel.findOne({
      where: {
        id: id,
        deleted: false,
      },
      attributes: ['id', 'name', 'realmName', 'createdAt', 'activated'],
    });

    if (isEmpty(group)) {
      throw errorUtils.BuildNewError('GroupNotFound');
    }

    return group;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = {
  CreateGroup: CreateGroup,
  GetAllGroup: GetAllGroup,
  GetGroupById: GetGroupById,
  UpdateGroup: UpdateGroup,
  DeleteGroup: DeleteGroup,
  CountGroup: CountGroup,
  GetUsersByGroupName: GetUsersByGroupName,
};

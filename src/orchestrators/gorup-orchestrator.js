'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');

const repository = require('../repository');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.GROUP_ORCHESTRATOR);

const errorUtils = require('../../utils/error-util');

const CreateGroup = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function createRealm has been start`);
    const { name } = req.body;

    const isDuplicate = await checkDuplicate(name);

    if (isDuplicate) {
      throw errorUtils.BuildNewError('DuplicateRealmName');
    }

    const realm = await repository.DBManager({
      type: 'RealmModel',
      method: 'create',
      options: {
        name,
      },
    });

    loggerFactory.info(`Function createRealm has been end`);

    return { data: { realm }, msg: 'CreateRealmSuccess' };
  } catch (err) {
    loggerFactory.error(`Function CreateRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetAllGroup = async (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function getAllRealm has been start`);
    const { limit, offset } = req.query;

    const realms = await repository.DBManager({
      type: 'RealmModel',
      method: 'findAll',
      options: {
        where: {
          deleted: false,
        },
      },
    });

    loggerFactory.info(`Function getAllRealm has been end`);
    return { data: {}, msg: 'GetRealmsSuccess' };
  } catch (err) {
    loggerFactory.error(`Function GetAllRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const GetGroupById = (toolBox) => {
  const { req } = toolBox;
  try {
    loggerFactory.info(`Function GetByIdRealm has been start`);
    loggerFactory.info(`Function GetByIdRealm has been end`);
  } catch (err) {
    loggerFactory.error(`Function GetByIdRealm has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const UpdateGroup = (toolBox) => {
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

const DeleteGroup = (toolBox) => {
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

const CountGroup = (toolBox) => {};

const MembersGroup = (toolBox) => {};

const checkDuplicate = async (name) => {
  const isDuplicate = await repository.DBManager({
    type: 'RealmModel',
    method: 'count',
    options: {
      where: {
        name: name,
      },
    },
  });

  return isDuplicate >= 1 ? true : false;
};

module.exports = {
  CreateGroup: CreateGroup,
  GetAllGroup: GetAllGroup,
  GetGroupById: GetGroupById,
  UpdateGroup: UpdateGroup,
  DeleteGroup: DeleteGroup,
  CountGroup: CountGroup,
  MembersGroup: MembersGroup,
};

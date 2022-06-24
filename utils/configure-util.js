'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const moment = winext.require('moment');
winext.require('moment-timezone');
const fs = require('fs');
const path = require('path');
const logger = require('winext-logger');
const lodash = winext.require('lodash');
const constants = require('../constants');
const { isEmpty } = lodash;

const { Op } = require('sequelize');

const errorUtils = require('../utils/error-util');

const slugUtils = winext.slugUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.CONFIGURE_UTIL);

const GetKeyManagerJSON = () => {
  try {
    loggerFactory.info(`GetKeyManagerJSON has been start`);
    const configurePath = path.join(process.cwd(), 'keyManager.json');
    if (!configurePath) {
      throw errorUtils.BuildNewError('NotFoundConfigKeyManagerJSON');
    }

    const json = fs.readFileSync(configurePath);
    const configure = JSON.parse(json.toString());
    loggerFactory.info(`GetKeyManagerJSON has been end`);
    return configure;
  } catch (err) {
    loggerFactory.error(`GetKeyManagerJSON has error`, {
      args: err.message,
    });
    throw err;
  }
};

const AttributeFilter = (data = {}, action) => {
  try {
    loggerFactory.info(`AttributeFilter has been start`);
    const nowMoment = moment.tz(constants.TIMEZONE_DEFAULT).utc();

    if (action === 'create') {
      data.createdAt = nowMoment;
      data.createdBy = constants.DEFAULT_SYSTEM;
      data.updatedAt = nowMoment;
      data.updatedBy = constants.DEFAULT_SYSTEM;
    }

    data.updatedAt = nowMoment;
    data.updatedBy = constants.DEFAULT_SYSTEM;

    loggerFactory.info(`AttributeFilter has been end`);
    return data;
  } catch (err) {
    loggerFactory.error(`AttributeFilter has error`, {
      args: err.message,
    });
    throw err;
  }
};

const CreateFilterPagination = (query = {}) => {
  const _start = query._start || constants.DEFAULT_SKIP;
  const _end = query._end || constants.DEFAULT_LIMIT;

  const skip = parseInt(_start);
  let limit = parseInt(_end);

  limit = limit - skip;

  return {
    skip,
    limit,
  };
};

const CreateFindQuery = (query = {}) => {
  const { search } = query;

  const _query = {
    [Op.and]: [
      {
        deleted: false,
      },
    ],
  };

  if (!isEmpty(search)) {
    const _search = slugUtils.parseSlug(search);

    const querySearch = { [Op.or]: [] };
    const searchProperties = ['slug'];

    searchProperties.forEach((property) => {
      const searchRegex = {};
      searchRegex[property] = { [Op.regexp]: _search };
      querySearch[Op.or].push(searchRegex);
    });

    _query[Op.and].push(querySearch);
  }

  return _query;
};

const CreateOrderQuery = (query = {}) => {
  const { _sort, _order } = query;

  const sort = isEmpty(_sort) ? 'slug' : _sort;
  const order = isEmpty(_order) ? 'DESC' : _order === 'asc' ? 'ASC' : 'DESC';

  return [[sort, order]];
};

const CheckDuplicate = async (model, options = {}) => {
  const isDuplicate = await model.count({
    where: options,
  });

  return isDuplicate >= 1 ? true : false;
};

const ConvertDataResponses = (responses = [], isFilter = false) => {
  return Promise.map(
    responses,
    (data) => {
      return ConvertDataResponse(data, isFilter);
    },
    { concurrency: 5 }
  );
};

const ConvertDataResponse = (data = {}, isFilter = false) => {
  let response = {};

  if (!isEmpty(data)) {
    response = data.toJSON();

    if (!isFilter) {
      delete response.createdAt;
      delete response.createdBy;
      delete response.updatedAt;
      delete response.updatedBy;
    }

    return Promise.resolve(response);
  }

  return Promise.resolve();
};

const configureUtils = {
  GetKeyManagerJSON,
  AttributeFilter,
  CheckDuplicate,
  ConvertDataResponses,
  ConvertDataResponse,
  CreateFilterPagination,
  CreateFindQuery,
  CreateOrderQuery,
};

module.exports = configureUtils;

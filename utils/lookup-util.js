'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../constants');
const { get, includes } = lodash;

const errorUtils = require('../utils/error-util');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.LOOKUP_UTIL);

const LookupSchemaModel = (schemaModels, type, sequelize) => {
  try {
    loggerFactory.info(`LookupSchemaModel has been start`);
    const models = get(sequelize, 'models');
    let model = null;
    if (includes(schemaModels, models[type])) {
      model = models[type];
      loggerFactory.info(`LookupSchemaModel has been end`);
      return model;
    }
    throw errorUtils.BuildNewError('InvalidNameModel');
  } catch (err) {
    loggerFactory.error(`LookupSchemaModel has been start`, {
      args: err.message,
    });
    throw err;
  }
};

const lookupUtils = {
  LookupSchemaModel,
};

module.exports = lookupUtils;

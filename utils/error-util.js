'use strict';

const logger = require('winext-logger');
const { errorCodes } = require('../config');
const constants = require('../constants');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.ERROR_UTIL);

const BuildNewError = (msg = '') => {
  try {
    loggerFactory.error(`Function BuildNewError has been start`);
    const error = {};
    if (Object.prototype.hasOwnProperty.call(errorCodes, msg)) {
      loggerFactory.error(`HasOwnProperty name in errorCodes`);
      error.name = msg;
      error.message = errorCodes[msg].message;
      error.returnCode = errorCodes[msg].returnCode;
      error.statusCode = errorCodes[msg].statusCode;
    } else {
      loggerFactory.error(`Not hasOwnProperty message in errorCodes`);
      error.name = msg;
      error.message = `Error name [${msg}] not supported`;
      error.returnCode = 9999;
      error.statusCode = 400;
    }
    loggerFactory.error(`Function BuildNewError end`);
    return error;
  } catch (err) {
    loggerFactory.error(`Function BuildNewError has error`, {
      args: err.message,
    });
    throw err;
  }
};

const errorUtils = {
  BuildNewError,
};

module.exports = errorUtils;

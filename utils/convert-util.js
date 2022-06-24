'use strict';

const logger = require('winext-logger');
const constants = require('../constants');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.CONVERT_UTIL);

const GetSecretPublicKey = (secretKey) => {
  try {
    loggerFactory.info(`GetSecretPublicKey has been start`);
    let secret;
    secret = '-----BEGIN PUBLIC KEY-----\n';
    for (let i = 0; i < secretKey.length; i = i + 64) {
      secret += secretKey.substring(i, i + 64);
      secret += '\n';
    }
    secret += '-----END PUBLIC KEY-----';
    loggerFactory.info(`GetSecretPublicKey has been end`);
    return secret;
  } catch (err) {
    loggerFactory.error(`GetSecretPublicKey has error`, {
      args: err.message,
    });
    throw err;
  }
};

const convertUtils = {
  GetSecretPublicKey,
};

module.exports = convertUtils;

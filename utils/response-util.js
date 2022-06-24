'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../constants');
const { assign, get } = lodash;

const templateUtils = require('./template-util');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.RESPONSE_UTIL);

const BuildSuccessResponse = (toolBox, args) => {
  try {
    loggerFactory.info(`BuildSuccessResponse has been start`);
    const { res } = toolBox;
    const header = get(args, 'headers');

    const templateSuccessResponse = templateUtils.BuildNewSuccessTemplate(toolBox, args);

    const headers = assign({}, header ? header : {}, {
      'X-Return-Code': templateSuccessResponse.returnCode,
    });

    loggerFactory.info(`BuildSuccessResponse has been end`);

    return res.status(templateSuccessResponse.statusCode).set(headers).send(templateSuccessResponse);
  } catch (err) {
    loggerFactory.error(`BuildSuccessResponse has error`, {
      args: err.message,
    });
    throw err;
  }
};

const BuildErrorResponse = (toolBox, args) => {
  try {
    loggerFactory.error(`BuildErrorResponse has been start`);
    const { res } = toolBox;

    const templateErrorResponse = templateUtils.BuildNewErrorTemplate(toolBox, args);

    const headers = assign(
      {},
      {
        'X-Return-Code': templateErrorResponse.returnCode,
      }
    );

    loggerFactory.error(`BuildErrorResponse has been end`);

    return res.status(templateErrorResponse.statusCode).set(headers).send(templateErrorResponse);
  } catch (err) {
    loggerFactory.error(`BuildErrorResponse has been error`, {
      args: err.message,
    });
    throw err;
  }
};

const responseUtils = {
  BuildSuccessResponse,
  BuildErrorResponse,
};

module.exports = responseUtils;

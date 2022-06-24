'use strict';

const logger = require('winext-logger');
const constants = require('../../constants');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_MIDDLEWARES.ERROR_MIDDLEWARE);

const ErrorsMiddleware = (err, req, res, next) => {
  loggerFactory.error(`ErrorsMiddleware has been start`, {
    args: err,
  });

  res.status(500).send(err.stack);

  loggerFactory.error(`ErrorsMiddleware has been end`);
};

module.exports = ErrorsMiddleware;

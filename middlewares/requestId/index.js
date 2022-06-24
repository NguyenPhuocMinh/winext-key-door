'use strict';

const winext = require('winext');
const logger = require('winext-logger');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

const constants = require('../../constants');

const uuidUtils = winext.uuidUtils;
const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_MIDDLEWARES.REQUEST_ID_MIDDLEWARE);

const ATTRIBUTE_KEY = constants.ATTRIBUTE_REQUEST_ID;

const RequestIdMiddleware = () => {
  return (req, res, next) => {
    loggerFactory.info(`RequestIdMiddleware has been start`);

    const generator = uuidUtils.generateRequestID;
    const headerName = constants.ATTRIBUTE_REQUEST_ID_KEY;

    const oldRequestID = req.get(headerName);
    const requestID = oldRequestID === undefined ? generator() : oldRequestID;

    if (isEmpty(oldRequestID)) {
      res.set(headerName, requestID);
    }

    req[ATTRIBUTE_KEY] = requestID;

    loggerFactory.info(`RequestIdMiddleware has been end`);

    next();
  };
};

module.exports = RequestIdMiddleware;

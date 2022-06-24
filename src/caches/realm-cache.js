'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const { isEmpty } = lodash;

// configs
const constants = require('../../constants');

// services
const { redisClient } = require('../../core/services/redis');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CACHES.REALM_CACHE);

const responseUtils = require('../../utils/response-util');

const GetRealmCache = async (req, res, next) => {
  const toolBox = { req, res, next };
  console.log("🚀 ~ file: realm-cache.js ~ line 21 ~ GetRealmCache ~ req", req.route)
  const { path } = req;
  const redisKey = '/realms';

  try {
    if (path !== redisKey) {
      next();
    } else {
      await redisClient.get(redisKey, (err, reply) => {
        loggerFactory.info(`Function getRealmCache has been start with redisKey`, {
          args: redisKey,
        });
        if (err) {
          throw err;
        }
        if (!isEmpty(reply)) {
          loggerFactory.info(`Function getRealmCache has been end with redis`, {
            args: redisKey,
          });
          return responseUtils.BuildSuccessResponse(toolBox, JSON.parse(reply));
        } else {
          next();
        }
      });
    }
  } catch (err) {
    loggerFactory.error(`Function getRealmCache has error`, {
      args: err,
    });
    return responseUtils.BuildErrorResponse(toolBox, err);
  }
};

module.exports = {
  GetRealmCache: GetRealmCache,
};

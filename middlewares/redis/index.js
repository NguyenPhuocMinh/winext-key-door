'use strict';

const logger = require('winext-logger');

// configs
const constants = require('../../constants');

// caches
const { RealmCache } = require('../../src/caches');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_MIDDLEWARES.REDIS_MIDDLEWARE);

const RedisMiddleware = (req, res, next) => {
console.log("🚀 ~ file: index.js ~ line 15 ~ RedisMiddleware ~ req", req.route)
  try {
    // const redisMiddleware = [];

    // redisMiddleware.push(RealmCache.GetRealmCache);

    // return redisMiddleware;
    return next();
  } catch (err) {
    loggerFactory.error(`RedisMiddleware has error`, {
      args: err,
    });

    throw err;
  }
};

module.exports = RedisMiddleware;

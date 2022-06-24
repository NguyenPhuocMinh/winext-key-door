'use strict';

const redis = require('redis');
const logger = require('winext-logger');

const { profiles } = require('../../config');
const constants = require('../../constants');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_NAME_SERVICE_REDIS);

const redisPort = profiles.redisPort;
const redisHost = profiles.redisHost;
const redisUser = profiles.redisUser;
const redisPassword = profiles.redisPassword;
const redisUrl = profiles.isProduction
  ? `redis://${redisUser}:${redisPassword}@${redisHost}:${redisPort}`
  : `redis://${redisHost}:${redisPort}`;

const redisClient = redis.createClient({ url: redisUrl, legacyMode: true });

const startRedis = async () => {
  try {
    loggerFactory.info(`Redis has been start !!!`);
    redisClient.on('error', (err) => {
      if (err) {
        loggerFactory.error(`Start redis connection has error`, {
          args: err,
        });
        throw err;
      }
    });
    await redisClient.connect();
    loggerFactory.http(`Redis connect complete on`, {
      args: `[${redisUrl}]`,
    });
  } catch (err) {
    loggerFactory.error(`Start redis has been error`, {
      args: err,
    });
    throw err;
  }
};

const stopRedis = async () => {
  try {
    loggerFactory.warn(`Redis has been close !!!`);
    await redisClient.disconnect();
  } catch (err) {
    loggerFactory.error(`Stop redis has been error`, {
      args: err,
    });
    throw err;
  }
};

const redisManager = {
  startRedis,
  stopRedis,
  redis,
  redisClient,
};

module.exports = redisManager;

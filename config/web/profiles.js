'use strict';

const dotenv = require('dotenv');
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const appPath = process.env.APP_PATH || '/admin';
const appDocs = process.env.APP_DOCS;
const appProtocol = process.env.APP_PROTOCOL;
const appPort = process.env.APP_PORT;
const appHost = process.env.APP_HOST;
const appClientPath = process.env.APP_CLIENT_PATH;

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.NAME_DATABASE;

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const redisUser = process.env.REDIS_USER;
const redisPassword = process.env.REDIS_PASSWORD;

const profiles = {
  isProduction,
  appPath,
  appDocs,
  appProtocol,
  appPort,
  appHost,
  appClientPath,
  dbHost,
  dbPort,
  dbUser,
  dbPassword,
  dbName,
  redisHost,
  redisPort,
  redisUser,
  redisPassword,
};

module.exports = profiles;

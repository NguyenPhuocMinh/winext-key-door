'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const mysql = winext.require('mysql');
const Sequelize = require('sequelize');
const logger = require('winext-logger');

// configs
const { profiles, options } = require('../../config');
const constants = require('../../constants');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_NAME_DATABASE);

const dbHost = profiles.dbHost;
const dbPort = profiles.dbPort;
const dbUser = profiles.dbUser;
const dbPassword = profiles.dbPassword;
const dbName = profiles.dbName;
const dialect = options.sequelizeOptions.dialect;

const mysqlUrl = `${dialect}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const createConnection = mysql.createConnection({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPassword,
  database: dbName,
});

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dialect,
  pool: options.sequelizeOptions.pool,
  // logging: false,
});

const startDB = async () => {
  try {
    loggerFactory.info(`Database has been start !!!`);
    await createConnection.connect((err) => {
      if (!err) {
        loggerFactory.http(`Database connect complete on`, {
          args: `[${mysqlUrl}]`,
        });
      }
    });
    await sequelize.authenticate().then((err) => {
      if (!err) {
        loggerFactory.info(`Sequelize connect complete`);
      } else {
        throw err;
      }
    });
  } catch (err) {
    loggerFactory.error(`Database start has been error`, {
      args: err,
    });
    throw err;
  }
};

const stopDB = async () => {
  try {
    loggerFactory.info(`Database has been close !!!`);
    await createConnection.end();
    await sequelize.close();
  } catch (err) {
    loggerFactory.error(`Database close has error`, {
      args: err,
    });
    return Promise.reject(err);
  }
};

const dbManager = {
  startDB,
  stopDB,
  sequelize,
  Sequelize,
};

module.exports = dbManager;

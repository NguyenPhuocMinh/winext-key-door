'use strict';

const path = require('path');
const winext = require('winext');
const lodash = require('lodash');
const chalk = winext.require('chalk');
const dataSequelizeStore = winext.require('winext-repo-store').dataSequelizeStore;
const errorManager = winext.require('winext-error-manager');
const parseSlug = winext.parseSlug;
const errorCodes = require('../config/errorCodes');
const loadConfiguration = require('../utils/loadConfiguration');
const generatePassword = require('../utils/generatePassword');

function Init(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  const configurePath = path.join(process.cwd(), 'keyManager.json');
  if (!configurePath) {
    throw errorManager.newError('NotFoundConfigKeyManagerJSON', errorCodes);
  }
  const configure = loadConfiguration(configurePath);

  loggerTracer.info(chalk.green.bold(`Start func Init key manager successfully!`));

  return async (request, response, next) => {
    const { requestID } = request;

    loggerFactory.warn(`function Init has been start`, {
      requestId: `${requestID}`,
    });

    // create supper admin
    const [user, created] = await dataSequelizeStore.findCreate({
      type: 'SupperAdminModel',
      options: {
        where: {
          userName: configure.admin.userName,
          slug: parseSlug(configure.admin.userName),
          deleted: false,
        },
        defaults: {
          userName: configure.admin.userName,
          password: generatePassword(configure.admin.password),
          slug: parseSlug(configure.admin.userName),
        },
      },
    });
    console.log('🚀 ~ file: init.js ~ line 45 ~ return ~ user', user);
    console.log('🚀 ~ file: init.js ~ line 31 ~ return ~ created', created);

    next();
  };
}

module.exports = Init;

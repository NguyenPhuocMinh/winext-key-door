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

  loggerTracer.info(chalk.green.bold(`Start func Init key manager successfully!`));

  const configurePath = path.join(process.cwd(), 'keyManager.json');
  if (!configurePath) {
    throw errorManager.newError('NotFoundConfigKeyManagerJSON', errorCodes);
  }
  const configure = loadConfiguration(configurePath);

  return async (request, response, next) => {
    const { requestID } = request;

    loggerFactory.warn(`function Init has been start`, {
      requestId: `${requestID}`,
    });

    const userNameAdmin = configure.admin.userName;
    const passwordAdmin = await generatePassword(configure.admin.password);
    const slugName = parseSlug(configure.admin.userName);

    // create supper admin
    const [user, created] = await dataSequelizeStore.findCreate({
      type: 'SupperAdminModel',
      options: {
        where: {
          userName: userNameAdmin,
          slug: slugName,
          deleted: false,
        },
        defaults: {
          userName: userNameAdmin,
          password: passwordAdmin,
          slug: slugName,
        },
      },
    });
    console.log('🚀 ~ file: init.js ~ line 45 ~ return ~ user', user);
    console.log('🚀 ~ file: init.js ~ line 31 ~ return ~ created', created);

    next();
  };
}

module.exports = Init;

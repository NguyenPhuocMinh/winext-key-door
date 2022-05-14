'use strict';

const winext = require('winext');
const dataSequelizeStore = winext.require('winext-repo-store').dataSequelizeStore;
const lodash = winext.require('lodash');
const chalk = winext.require('chalk');
const dotenv = winext.require('dotenv');
const path = require('path');
const parseSlug = winext.parseSlug;
const generatePassword = require('../utils/generatePassword');
const { get } = lodash;

dotenv.config();

function Init(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  const configure = path.join(process.cwd(), 'keyManager.json');

  loggerTracer.info(chalk.green.bold(`Start func Init key manager successfully!`));

  return async (request, response, next) => {
    const { requestID } = request;

    loggerFactory.warn(`function Init has been start`, {
      requestId: `${requestID}`,
    });

    // create supper admin
    const [user, created] = await dataSequelizeStore.findCreate({
      type: 'UserModel',
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

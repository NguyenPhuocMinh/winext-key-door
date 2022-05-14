'use strict';

const winext = require('winext');
const lodash = require('lodash');
const dataSequelizeStore = winext.require('winext-repo-store').dataSequelizeStore;
const chalk = winext.require('chalk');
const parseSlug = winext.parseSlug;
const path = require('path');
const fs = require('fs');
const generatePassword = require('../utils/generatePassword');

function Init(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  const configurePath = path.join(process.cwd(), 'keyManager.json');
  if (!configurePath) {
    throw new Error('Not found configure keyManager.json!');
  }
  const configure = this.loadConfiguration(configurePath);

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

Init.prototype.loadConfiguration = (configPath) => {
  const json = fs.readFileSync(configPath);
  const configure = JSON.parse(json.toString());

  return configure;
};

module.exports = Init;

'use strict';

const winext = require('winext');
const chalk = winext.require('chalk');
const dataSequelizeStore = winext.require('winext-repo-store').dataSequelizeStore;
const parseSlug = winext.parseSlug;
const loadConfiguration = require('../utils/loadConfiguration');
const generatePassword = require('../utils/generatePassword');

function Init(params = {}) {
  const { loggerFactory, loggerTracer } = params;

  loggerTracer.info(chalk.green.bold(`Start func Init key manager successfully!`));

  const configure = loadConfiguration();

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
          created_by: 'init',
          updated_by: 'init',
        },
      },
    });
    next();
  };
}

module.exports = Init;

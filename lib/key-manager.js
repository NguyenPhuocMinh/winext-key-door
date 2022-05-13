'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const dotenv = winext.require('dotenv');
const chalk = winext.require('chalk');
const { get } = lodash;
const { name, version } = require('../package.json');
const defaultPaths = require('../config/paths');

// middlwares
const Init = require('../middlewares/init');
const Admin = require('../middlewares/admin');
// supports
const { Realms, Users, Roles, Groups, Clients } = require('../supports');

function KeyManager(params = {}) {
  // config env
  dotenv.config();

  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');

  this.middleware = function (opts = {}) {
    try {
      loggerTracer.info(chalk.green.bold(`Load start key manager ${name}-${version} successfully!`));

      loggerFactory.warn(`function middleware keyManager has been start`, {
        requestId: `${requestId}`,
      });

      const { app, router } = opts;

      const middlewares = [];

      const registersMiddleware = [Init, Admin];

      for (let i = 0; i < registersMiddleware.length; i++) {
        registersMiddleware[i].register(params);
      }

      middlewares.push(Init.config);
      middlewares.push(Init.postAdmin);
      middlewares.push(Admin.loginAdmin);
      middlewares.push(Admin.loginAdmin);

      loggerFactory.warn(`function middleware keyManager has been end`, {
        requestId: `${requestId}`,
      });

      return middlewares;
    } catch (err) {
      loggerFactory.error(`function middleware keyManager has error: ${err}`, {
        requestId: `${requestId}`,
      });
      return Promise.reject(err);
    }
  };
}

exports = module.exports = new KeyManager();
exports.register = KeyManager;

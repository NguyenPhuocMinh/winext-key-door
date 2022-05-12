'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const dotenv = winext.require('dotenv');
const chalk = winext.require('chalk');
const { get } = lodash;
const { name, version } = require('../package.json');

function KeyManager(params = {}) {
  // config env
  dotenv.config();

  const config = get(params, 'config', {});
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');

  this.middleware = async function (opts = {}) {
    try {
      loggerTracer.info(chalk.green.bold(`Load start key manager ${name}-${version} successfully!`));

      loggerFactory.warn(`function middleware keyManager has been start`, {
        requestId: `${requestId}`,
      });

      const { app } = opts;

      const middlewares = [];

      middlewares.push(this.init(opts));
      middlewares.push(this.login(opts));

      loggerFactory.warn(`function middleware keyManager has been end`, {
        requestId: `${requestId}`,
      });

      app.use(middlewares);
    } catch (err) {
      loggerFactory.error(`function middleware keyManager has error: ${err}`, {
        requestId: `${requestId}`,
      });
    }
  };

  this.init = async function (opts = {}) {
    console.log('🚀 ~ file: key-manager.js ~ line 44 ~ opts', opts);
    try {
      loggerFactory.warn(`function init keyManager has been start`, {
        requestId: `${requestId}`,
      });

      loggerFactory.warn(`function init keyManager has been end`, {
        requestId: `${requestId}`,
      });
    } catch (err) {
      loggerFactory.error(`function init keyManager has error: ${err}`, {
        requestId: `${requestId}`,
      });
    }
  };

  this.login = async function (opts = {}) {};
}

exports = module.exports = new KeyManager();
exports.register = KeyManager;

'use strict';

const path = require('path');
const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const chalk = winext.require('chalk');
const dataSequelizeStore = winext.require('winext-repo-store').dataSequelizeStore;
const errorManager = winext.require('winext-error-manager');
const bcrypt = winext.require('bcryptjs');
const jwt = winext.require('jsonwebtoken');
const parseSlug = winext.parseSlug;
const errorCodes = require('../config/errorCodes');
const { defaultPaths } = require('../config/paths');
const loadConfiguration = require('../utils/loadConfiguration');
const { get, isEmpty, isEqual } = lodash;

function Admin(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  loggerTracer.info(chalk.green.bold(`Start func Admin key manager successfully!`));

  router.post('/login', this.loginAdmin);
  router.post('/logout', this.logoutAdmin);

  app.use(defaultPaths, router);

  const configure = loadConfiguration();

  this.loginAdmin = async function (request, response, next) {
    try {
      const { requestID } = request;
      loggerFactory.warn(`function loginAdmin has been start`, {
        requestId: `${requestID}`,
      });
      const { userName, password } = request.body;

      if (isEmpty(userName)) {
        throw errorManager.newError('UserNameIsRequired', errorCodes);
      }

      if (isEmpty(password)) {
        throw errorManager.newError('PasswordIsRequired', errorCodes);
      }

      if (!isEqual(userName, configure.admin.userName)) {
        throw errorManager.newError('UserNameNotFound', errorCodes);
      }

      const adminLogin = await dataSequelizeStore.findOne({
        type: 'SupperAdminModel',
        options: {
          where: { userName: userName, slug: parseSlug(userName), deleted: false },
        },
      });
      console.log("🚀 ~ file: admin.js ~ line 56 ~ adminLogin", adminLogin)

      const validPass = await bcrypt.compare(password, adminLogin.password);
      if (!validPass) {
        throw errorManager.newError('IncorrectPassword', errorCodes);
      }

      /**
       * create token admin
       */
      // const accessToken = jwt.sign({ userLogin: userData }, process.env.TOKEN_SECRET, {
      //   expiresIn: 86400, // one day
      // });
      /**
       * create refresh token admin
       */
      // const refreshToken = jwt.sign({ userLogin: userData }, process.env.REFRESH_TOKEN_SECRET, {
      //   expiresIn: 86400, // one day
      // });

      loggerFactory.warn(`function loginAdmin has been end`, {
        requestId: `${requestID}`,
      });
    } catch (err) {
      return Promise.reject(err);
    }
  };

  this.logoutAdmin = async function (req, res, next) {};

  return (request, response, next) => {
    next();
  };
}

module.exports = Admin;

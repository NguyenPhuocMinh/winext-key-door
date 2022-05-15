'use strict';

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
const { isEmpty, isEqual } = lodash;

function Admin(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  const opts = {
    loggerFactory,
    loggerTracer,
  };

  loggerTracer.info(chalk.green.bold(`Start func Admin key manager successfully!`));

  router.post('/login', (request, response, next) => loginAdmin(request, response, next, opts));
  router.post('/logout', (request, response, next) => logoutAdmin(request, response, next, opts));

  app.use(defaultPaths, router);

  return (request, response, next) => {
    next();
  };
}

const loginAdmin = async (req, res, next, opts) => {
  const { loggerFactory, loggerTracer } = opts;
  loggerTracer.info(chalk.green.bold(`Start func loginAdmin key manager successfully!`));
  try {
    const { requestID } = req;
    const configure = loadConfiguration();
    loggerFactory.warn(`function loginAdmin has been start`, {
      requestId: `${requestID}`,
    });
    const { userName, password } = req.body;

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
    console.log('🚀 ~ file: admin.js ~ line 56 ~ adminLogin', adminLogin);

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
    res.send({ data: 'ok' });
  } catch (err) {
    return Promise.reject(err);
  }
};

const logoutAdmin = async (req, res, next, opts) => {};

module.exports = Admin;

'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const bcrypt = winext.require('bcryptjs');
const logger = require('winext-logger');
const tokenGenerator = require('winext-authorization').tokenGenerator;
const { isEmpty, isEqual } = lodash;

// configs
const { options, webConfigs } = require('../../config');
const constants = require('../../constants');

// repository
const { sequelize, SupperAdminModel } = require('../repository');

const uuidUtils = winext.uuidUtils;
const slugUtils = winext.slugUtils;
const errorUtils = require('../../utils/error-util');
const configureUtils = require('../../utils/configure-util');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_ORCHESTRATORS.ADMIN_ORCHESTRATOR);

tokenGenerator.register({ loggerTracer: loggerFactory });

const LoginAdmin = async (toolBox) => {
  const { req, res } = toolBox;

  const t = await sequelize.transaction();

  try {
    const { userName, password } = req.body;
    loggerFactory.info(`Function loginAdmin orchestrator has been start`);

    const configure = configureUtils.GetKeyManagerJSON();

    if (isEmpty(userName)) {
      throw errorUtils.BuildNewError('UserNameIsRequired');
    }

    if (isEmpty(password)) {
      throw errorUtils.BuildNewError('PasswordIsRequired');
    }

    const salt = await bcrypt.genSalt(10);

    const userNameAdmin = configure.admin.userName;
    const passwordAdmin = await bcrypt.hash(configure.admin.password, salt);
    const slugName = slugUtils.parseSlug(userNameAdmin);

    // supper admin
    const [admin, created] = await SupperAdminModel.findOrCreate({
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
      transaction: t,
    });

    await t.commit();

    loggerFactory.info(`Supper admin has been created`, {
      args: created,
    });

    if (!isEqual(userName, admin.userName)) {
      throw errorUtils.BuildNewError('UserNameAdminNotFound');
    }

    const validPass = await bcrypt.compare(password, admin.password);
    if (!validPass) {
      throw errorUtils.BuildNewError('IncorrectPasswordAdmin');
    }

    const data = convertDataResponse(admin);

    const accessToken = tokenGenerator.signToken({
      payload: data,
      signOptions: {
        jwtid: uuidUtils.v1,
        expiresIn: options.tokenOptions.expiresIn,
      },
    });

    res.cookie(constants.ATTRIBUTE_TOKEN_KEY, accessToken, options.cookieOptions);

    loggerFactory.info(`Function loginAdmin orchestrator has been end`);

    return { result: { accessToken, webConfigs }, msg: 'LoginAdminSuccess' };
  } catch (err) {
    loggerFactory.error(`Function loginAdmin orchestrator has error`, {
      args: err.message,
    });
    await t.rollback();
    return Promise.reject(err);
  }
};

const LogoutAdmin = (toolBox) => {
  const { res } = toolBox;
  try {
    loggerFactory.info(`Function logoutAdmin orchestrator has been start`);
    res.clearCookie(constants.ATTRIBUTE_TOKEN_KEY);
    loggerFactory.info(`Function logoutAdmin orchestrator has been end`);

    return { result: {}, msg: 'LogoutAdminSuccess' };
  } catch (err) {
    loggerFactory.error(`Function logoutAdmin orchestrator has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const convertDataResponse = (data) => {
  const response = {};

  if (!isEmpty(data)) {
    data = data.toJSON();
    response.id = data.id;
    response.userName = data.userName;
    response.email = data.email;
    response.firstName = data.firstName;
    response.lastName = data.lastName;

    return response;
  }

  return response;
};

module.exports = {
  LoginAdmin,
  LogoutAdmin,
};

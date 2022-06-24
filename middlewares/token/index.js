'use strict';

const winext = require('winext');
const logger = require('winext-logger');
const lodash = winext.require('lodash');
const jwt = winext.require('jsonwebtoken');
const { isEmpty } = lodash;

const { profiles } = require('../../config');
const constants = require('../../constants');
const errorUtils = require('../../utils/error-util');
const convertUtils = require('../../utils/convert-util');
const configureUtils = require('../../utils/configure-util');
const responseUtils = require('../../utils/response-util');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_MIDDLEWARES.TOKEN_MIDDLEWARE);

const TokenMiddleware = () => {
  return (req, res, next) => {
    const { method, path } = req;

    try {
      loggerFactory.info(`TokenMiddleware has been start`, {
        args: { method, path },
      });
      if (
        (method === constants.HTTP_METHOD.POST || method === constants.HTTP_METHOD.OPTIONS) &&
        path === `${profiles.appPath}/login`
      ) {
        loggerFactory.info(`TokenMiddleware has been end with`, {
          args: { method, path },
        });
        next();
      } else {
        // verify token middleware
        const token = req.header(constants.ATTRIBUTE_TOKEN_KEY) || req.cookies[constants.ATTRIBUTE_TOKEN_KEY];
        loggerFactory.debug(`TokenMiddleware has token`, {
          args: { token },
        });
        if (isEmpty(token)) {
          const tokenNotFoundError = errorUtils.BuildNewError('TokenNotFound');

          loggerFactory.info(`TokenMiddleware has been end with token null`, {
            args: { token },
          });

          return responseUtils.BuildErrorResponse({ req, res, next }, tokenNotFoundError);
        } else {
          /**
           * verify token
           */
          const configure = configureUtils.GetKeyManagerJSON();
          const secretPublic = convertUtils.GetSecretPublicKey(configure.publicKey);

          jwt.verify(token, secretPublic, (err, decoded) => {
            if (err) {
              loggerFactory.error(`Verify token has error`, {
                args: { name: err.name, message: err.message },
              });

              let tokenError = {};

              switch (err.name) {
                case constants.TOKEN_ERROR.TOKEN_EXPIRED:
                  tokenError = errorUtils.BuildNewError('TokenExpiredError');
                  break;
              }

              return responseUtils.BuildErrorResponse({ req, res, next }, tokenError);
            } else {
              if (!isEmpty(decoded)) {
                loggerFactory.info(`TokenMiddleware Verify token has been end with decoded token`, {
                  args: { decoded },
                });
                next();
              }
            }
          });
        }
      }
    } catch (err) {
      loggerFactory.error(`TokenMiddleware has error`, {
        args: err.message,
      });
      next(err);
    }
  };
};

module.exports = TokenMiddleware;

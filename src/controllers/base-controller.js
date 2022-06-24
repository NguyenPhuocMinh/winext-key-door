'use strict';

const winext = require('winext');
const logger = require('winext-logger');
const lodash = winext.require('lodash');
const constants = require('../../constants');
const { isFunction, isEmpty } = lodash;

const orchestrators = require('../orchestrators');

const errorUtils = require('../../utils/error-util');
const responseUtils = require('../../utils/response-util');
const validateUtils = require('../../utils/validate-util');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_CONTROLLERS.BASE_CONTROLLER);

/**
 * @description Base controller
 * @param {*} toolBox
 * @param {*} msgType
 * @param {*} msgAction
 */
const BaseController = async (toolBox, msgType, msgAction) => {
  const { req } = toolBox;

  try {
    loggerFactory.info(`Function BaseController has been start`, {
      args: {
        msgType,
        msgAction,
      },
    });
    const { orchestratorHandler, schema } = orchestrators.LookupOrchestrator(msgType, msgAction);
    if (!isFunction(orchestratorHandler)) {
      loggerFactory.error(`Not found callback OrchestratorHandler with`, {
        args: {
          msgType,
          msgAction,
        },
      });
      throw errorUtils.BuildNewError('OrchestratorHandlerNotFound');
    }

    if (!isEmpty(schema)) {
      const errorSchema = await validateUtils.BuildNewValidateSchema(schema, req.body);
      if (!isEmpty(errorSchema)) {
        loggerFactory.error(`Function BaseController has errorSchema`, {
          args: errorSchema.message,
        });
        return responseUtils.BuildErrorResponse(toolBox, errorSchema);
      }
    }

    loggerFactory.info(`Function BaseController has been end`);

    const response = await orchestratorHandler(toolBox);

    return responseUtils.BuildSuccessResponse(toolBox, response);
  } catch (err) {
    loggerFactory.error(`Function BaseController has error`, {
      args: err.message,
    });
    return responseUtils.BuildErrorResponse(toolBox, err);
  }
};

module.exports = BaseController;

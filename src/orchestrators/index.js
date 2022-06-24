'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const logger = require('winext-logger');
const constants = require('../../constants');
const { get } = lodash;

const baseOrchestrators = require('./base-orchestrator');

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_NAME_ORCHESTRATOR);

/**
 *
 * @param {*} msgType
 * @param {*} msgAction
 * @returns {Object}
 */
const LookupOrchestrator = (msgType, msgAction) => {
  try {
    loggerFactory.info(`Function LookupOrchestrator has been start`);

    let fnCallBack;
    let schema;

    baseOrchestrators.forEach((baseOrchestrator) => {
      const orchestratorType = get(baseOrchestrator, 'type');
      const orchestratorAction = get(baseOrchestrator, 'action');
      const orchestratorFn = get(baseOrchestrator, 'orchestrator');
      const orchestratorSchema = get(baseOrchestrator, 'schema');

      if (msgType === orchestratorType && orchestratorAction === msgAction) {
        fnCallBack = orchestratorFn;
        schema = orchestratorSchema;
      }
    });

    loggerFactory.info(`Function LookupOrchestrator has been end`);
    return { orchestratorHandler: fnCallBack, schema };
  } catch (err) {
    loggerFactory.error(`Function LookupOrchestrator has error`, {
      args: err.message,
    });
    return Promise.reject(err);
  }
};

const orchestrators = {
  LookupOrchestrator,
};

module.exports = orchestrators;

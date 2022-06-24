'use strict';

const winext = require('winext');
const logger = require('winext-logger');
const constants = require('../constants');
const Ajv = winext.require('ajv');
const ajv = new Ajv();

const logUtils = logger.logUtils;
const loggerFactory = logUtils.createLogger(constants.APP_NAME, constants.STRUCT_UTILS.VALIDATE_UTIL);

const errorUtils = require('./error-util');
const schemaUtils = require('./schema-util');

const BuildNewValidateSchema = async (schema, data) => {
  try {
    loggerFactory.info(`BuildNewValidateSchema has been start with schema`, {
      args: schema,
    });
    const errors = {};
    if (Object.prototype.hasOwnProperty.call(schemaUtils, schema)) {
      const validate = ajv.compile(schemaUtils[schema]);
      const valid = validate(data);
      if (!valid) {
        loggerFactory.debug(`validate errors`, {
          args: validate.errors,
        });
        errors.name = validate.errors[0].keyword;
        errors.message = validate.errors[0].message;
        errors.returnCode = 0;
        errors.statusCode = 400;
      }
    } else {
      throw errorUtils.BuildNewError('SchemaNotFound');
    }
    loggerFactory.info(`BuildNewValidateSchema has been end`);
    return errors;
  } catch (err) {
    loggerFactory.error(`BuildNewValidateSchema has error`, {
      args: err.message,
    });
    throw err;
  }
};

const validateUtils = {
  BuildNewValidateSchema,
};

module.exports = validateUtils;

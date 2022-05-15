'use strict';

const errorCodes = {
  NotFoundConfigKeyManagerJSON: {
    message: 'Not found configure keyManager.json',
    returnCode: 6000,
    statusCode: 500,
  },
  UserNameIsRequired: {
    message: 'User name is required',
    returnCode: 6001,
    statusCode: 400,
  },
  PasswordIsRequired: {
    message: 'Password is required',
    returnCode: 6002,
    statusCode: 400,
  },
  UserNameNotFound: {
    message: 'User name not found',
    returnCode: 6002,
    statusCode: 404,
  },
  IncorrectPassword: {
    message: 'Incorrect password',
    returnCode: 6002,
    statusCode: 400,
  }
};

module.exports = errorCodes;

'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { get } = lodash;

function Admin(params = {}) {
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');

  this.loginAdmin = async function (request, response, next) {
    return next();
  };

  this.logoutAdmin = async function (request, response, next) {
    return next();
  };
}

exports = module.exports = new Admin();
exports.register = Admin;

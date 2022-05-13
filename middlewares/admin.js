'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { get } = lodash;

function Admin(params = {}) {
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');

  this.login = async function (opts = {}) {
    const { next } = opts;

    return next();
  };

  this.logout = async function (opts = {}) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Admin();
exports.register = Admin;

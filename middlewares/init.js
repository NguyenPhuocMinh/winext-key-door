'use strict';

const winext = require('winext');
const Promise = winext.require('bluebird');
const lodash = winext.require('lodash');
const { get } = lodash;

function Init(params = {}) {
  const requestId = get(params, 'requestId');
  const loggerFactory = get(params, 'loggerFactory');
  const loggerTracer = get(params, 'loggerTracer');

  this.config = function (opts = {}) {
    const { next } = opts;

    return next();
  };

  this.postAdmin = async function (opts = {}) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Init();
exports.register = Init;

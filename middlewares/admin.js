'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { get } = lodash;

function Admin(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  return (request, response, next) => {
    next();
  };
}

module.exports = Admin;

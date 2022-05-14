'use strict';

function Users(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  return (request, response, next) => {
    next();
  };
}

module.exports = Users;

'use strict';

function Groups(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  return (request, response, next) => {
    next();
  };
}

module.exports = Groups;

'use strict';

function Realms(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  return (request, response, next) => {
    next();
  };
}

module.exports = Realms;

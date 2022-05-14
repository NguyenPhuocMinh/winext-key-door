'use strict';

function Clients(params = {}) {
  const { app, router, loggerFactory, loggerTracer } = params;

  return (request, response, next) => {
    next();
  };
}

module.exports = Clients;

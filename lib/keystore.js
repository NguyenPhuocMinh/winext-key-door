'use strict';

function KeyStore(params = {}) {
  this.middleware = function (app, router) {
    const middlewares = [];
    return middlewares;
  };
}

exports = module.exports = new KeyStore();
exports.register = KeyStore;

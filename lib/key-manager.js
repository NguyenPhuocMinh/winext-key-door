'use strict';

function KeyManager(params = {}) {
  this.middleware = function (app, router) {
    const middlewares = [];
    return middlewares;
  };
}

exports = module.exports = new KeyManager();
exports.register = KeyManager;

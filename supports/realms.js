'use strict';

function Realms(params = {}) {
  this.createRealm = async function (opts) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Realms();
exports.register = Realms;

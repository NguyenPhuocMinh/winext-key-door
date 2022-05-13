'use strict';

function Clients(params = {}) {
  this.createClient = async function (opts) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Clients();
exports.register = Clients;

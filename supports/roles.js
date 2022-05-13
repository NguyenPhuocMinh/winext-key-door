'use strict';

function Roles(params = {}) {
  this.createRole = async function (opts) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Roles();
exports.register = Roles;

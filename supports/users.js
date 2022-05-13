'use strict';

function Users(params = {}) {
  this.createUser = async function (opts) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Users();
exports.register = Users;

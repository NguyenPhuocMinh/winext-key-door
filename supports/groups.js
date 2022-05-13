'use strict';

function Groups(params = {}) {
  this.createGroups = async function (opts) {
    const { next } = opts;

    return next();
  };
}

exports = module.exports = new Groups();
exports.register = Groups;

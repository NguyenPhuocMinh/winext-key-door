'use strict';

const winext = require('winext');
const bcrypt = winext.require('bcryptjs');

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
};

module.exports = generatePassword;

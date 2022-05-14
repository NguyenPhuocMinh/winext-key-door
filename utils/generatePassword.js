'use strict';

const winext = require('winext');
const bcrypt = winext.require('bcryptjs');

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  await bcrypt.hash(password, salt);
};

module.exports = generatePassword;

'use strict';

const fs = require('fs');
const winext = require('winext');
const jwt = winext.require('jsonwebtoken');

const generateToken = (data = {}, algorithm = 'SHA256', expiresIn = 3600) => {
  const privateKey = fs.readFileSync('jwtRS256.key');

  const token = jwt.sign(data, privateKey, { algorithm: algorithm, expiresIn: expiresIn });

  return token;
};

module.exports = generateToken;

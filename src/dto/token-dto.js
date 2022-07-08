'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

const tokenDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const { signatureAlgorithm, expired } = data;

      response.signatureAlgorithm = signatureAlgorithm;
      response.expired = expired;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = tokenDTO;

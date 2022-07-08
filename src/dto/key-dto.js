'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

// repository

const keyDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const { id, name, useFor, activated, priority, keySize, algorithm } = data;

      response.id = id;
      response.name = name;
      response.useFor = useFor;
      response.priority = priority;
      response.keySize = keySize;
      response.algorithm = algorithm;
      response.activated = activated;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = keyDTO;

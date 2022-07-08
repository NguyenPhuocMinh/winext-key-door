'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

// repository

const realmDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const { id, name, titleName, activated, realmName, createdAt } = data;

      response.id = id;
      response.name = name;
      response.titleName = titleName;
      response.activated = activated;
      response.realmName = realmName;
      response.createdAt = createdAt;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = realmDTO;

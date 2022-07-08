'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

const groupDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const { id, name, realmName, createdAt, activated } = data;

      response.id = id;
      response.name = name;
      response.realmName = realmName;
      response.createdAt = createdAt;
      response.activated = activated;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = groupDTO;

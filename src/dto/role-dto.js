'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty } = lodash;

const roleDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const { id, name, description, activated, createdAt } = data;

      response.id = id;
      response.name = name;
      response.description = description;
      response.activated = activated;
      response.createdAt = createdAt;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = roleDTO;

'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty, differenceBy } = lodash;

// repository
const { RoleModel } = require('../repository');

const permissionDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const { id, name, description, roles, activated, createdAt } = data;

      response.id = id;
      response.name = name;
      response.description = description;
      response.activated = activated;
      response.createdAt = createdAt;

      const listRole = await RoleModel.findAll({
        where: {
          deleted: false,
          activated: true,
        },
      });

      response.availableRoles = differenceBy(listRole, roles, 'id');
      response.assignedRoles = roles;
      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = permissionDTO;

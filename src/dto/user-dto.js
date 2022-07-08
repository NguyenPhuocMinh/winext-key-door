'use strict';

const winext = require('winext');
const lodash = winext.require('lodash');
const { isEmpty, differenceBy, get } = lodash;

// repository
const { RoleModel } = require('../repository');

const userDTO = async (data) => {
  try {
    const response = {};

    if (!isEmpty(data)) {
      data = data.toJSON();
      const {
        id,
        userName,
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        activated,
        realmName,
        createdAt,
        realm,
        roles,
        groups,
      } = data;

      response.id = id;
      response.userName = userName;
      response.firstName = firstName;
      response.lastName = lastName;
      response.email = email;
      response.password = password;
      response.passwordConfirm = passwordConfirm;
      response.activated = activated;
      response.realmName = realmName;
      response.createdAt = createdAt;

      const listRole = await RoleModel.findAll({
        where: {
          deleted: false,
          activated: true,
        },
      });

      response.availableRoles = differenceBy(listRole, roles, 'id');
      response.assignedRoles = roles;

      const allAvailableGroups = get(realm, 'groups', []);
      response.availableGroups = differenceBy(allAvailableGroups, groups, 'id');
      response.assignedGroups = groups;

      return response;
    }

    return response;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

module.exports = userDTO;

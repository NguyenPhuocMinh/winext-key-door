'use strict';

const AdminController = require('./admin-controller');
const RealmController = require('./realm-controller');
const KeyController = require('./key-controller');
const EmailController = require('./email-controller');
const TokenController = require('./token-controller');
const UserController = require('./user-controller');
const RoleController = require('./role-controller');
const GroupController = require('./group-controller');
const PermissionController = require('./permission-controller');

module.exports = {
  AdminController,
  RealmController,
  KeyController,
  EmailController,
  TokenController,
  UserController,
  RoleController,
  GroupController,
  PermissionController,
};

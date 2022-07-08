'use strict';

const { sequelize, Sequelize } = require('../../core/db/database');

const SupperAdminModel = require('../../models/supper-admin')(sequelize, Sequelize.DataTypes);
const RealmModel = require('../../models/realm-model')(sequelize, Sequelize.DataTypes);
const UserModel = require('../../models/user-model')(sequelize, Sequelize.DataTypes);
const RoleModel = require('../../models/role-model')(sequelize, Sequelize.DataTypes);
const GroupModel = require('../../models/group-model')(sequelize, Sequelize.DataTypes);
const KeyModel = require('../../models/key-model')(sequelize, Sequelize.DataTypes);
const EmailModel = require('../../models/email-model')(sequelize, Sequelize.DataTypes);
const TokenModel = require('../../models/token-model')(sequelize, Sequelize.DataTypes);
const PermissionModel = require('../../models/permission-model')(sequelize, Sequelize.DataTypes);

const UserHasRoleModel = require('../../models/user-has-role-model')(sequelize, Sequelize.DataTypes);
const GroupHasUserModel = require('../../models/group-has-user-model')(sequelize, Sequelize.DataTypes);
const RoleHasPermissionModel = require('../../models/role-has-permission-model')(sequelize, Sequelize.DataTypes);

/**
 * @description One-To-One
 */
RealmModel.hasOne(KeyModel, { as: 'key', foreignKey: 'realmID' });
RealmModel.hasOne(EmailModel, { as: 'email', foreignKey: 'realmID' });
RealmModel.hasOne(TokenModel, { as: 'token', foreignKey: 'realmID' });

KeyModel.belongsTo(RealmModel, { as: 'realm', foreignKey: 'realmID' });
EmailModel.belongsTo(RealmModel, { as: 'realm', foreignKey: 'realmID' });
TokenModel.belongsTo(RealmModel, { as: 'realm', foreignKey: 'realmID' });

/**
 * @description One-To-Many
 */
RealmModel.hasMany(UserModel, { as: 'users', foreignKey: 'realmID' });
UserModel.belongsTo(RealmModel, { as: 'realm', foreignKey: 'realmID' });

RealmModel.hasMany(GroupModel, { as: 'groups', foreignKey: 'realmID' });
GroupModel.hasMany(RealmModel, { as: 'realm', foreignKey: 'realmID' });

/**
 * @description Many-To-Many
 */
UserModel.belongsToMany(RoleModel, { through: UserHasRoleModel, as: 'roles', foreignKey: 'userID' });
RoleModel.belongsToMany(UserModel, { through: UserHasRoleModel, as: 'users', foreignKey: 'roleID' });

UserModel.belongsToMany(GroupModel, { through: GroupHasUserModel, as: 'groups', foreignKey: 'userID' });
GroupModel.belongsToMany(UserModel, { through: GroupHasUserModel, as: 'users', foreignKey: 'groupID' });

RoleModel.belongsToMany(PermissionModel, { through: RoleHasPermissionModel, as: 'permissions', foreignKey: 'roleID' });
PermissionModel.belongsToMany(RoleModel, { through: RoleHasPermissionModel, as: 'roles', foreignKey: 'perID' });

module.exports = {
  sequelize,
  Sequelize,
  SupperAdminModel,
  RealmModel,
  UserModel,
  RoleModel,
  GroupModel,
  KeyModel,
  EmailModel,
  TokenModel,
  PermissionModel,
  UserHasRoleModel,
  GroupHasUserModel,
  RoleHasPermissionModel
};

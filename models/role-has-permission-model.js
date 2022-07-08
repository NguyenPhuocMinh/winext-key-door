'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleHasPermissionModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  RoleHasPermissionModel.init(
    {
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'role_has_permission',
      modelName: 'RoleHasPermission',
      timestamps: false,
    }
  );

  return RoleHasPermissionModel;
};

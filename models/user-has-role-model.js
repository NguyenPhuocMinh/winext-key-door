'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserHasRoleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  UserHasRoleModel.init(
    {
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'user_has_role',
      modelName: 'UserHasRole',
      timestamps: false,
    }
  );

  return UserHasRoleModel;
};

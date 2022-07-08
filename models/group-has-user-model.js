'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupHasUserModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  GroupHasUserModel.init(
    {
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'group_has_user',
      modelName: 'GroupHasUser',
      timestamps: false,
    }
  );
  return GroupHasUserModel;
};

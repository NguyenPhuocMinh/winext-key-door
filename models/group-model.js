'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  GroupModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      activated: { type: DataTypes.BOOLEAN, defaultValue: false },
      // filter
      realmName: { type: DataTypes.STRING },
      slug: { type: DataTypes.STRING },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      created_by: { type: DataTypes.STRING },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_by: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'groups',
      modelName: 'GroupModel',
      timestamps: false,
    }
  );

  return GroupModel;
};

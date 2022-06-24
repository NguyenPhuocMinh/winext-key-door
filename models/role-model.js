'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoleModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  RoleModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: { type: DataTypes.STRING },
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
      tableName: 'roles',
      modelName: 'RoleModel',
      timestamps: false,
    }
  );

  return RoleModel;
};

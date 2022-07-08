'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GroupModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RealmModel, { as: 'realm', foreignKey: 'realmID' });
    }
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
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'groups',
      modelName: 'Group',
      timestamps: false,
    }
  );

  return GroupModel;
};

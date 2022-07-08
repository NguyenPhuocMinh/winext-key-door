'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RealmModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.KeyModel, { as: 'key', foreignKey: 'realmID' });
      this.hasOne(models.EmailModel, { as: 'email', foreignKey: 'realmID' });
      this.hasOne(models.TokenModel, { as: 'token', foreignKey: 'realmID' });

      this.hasMany(models.UserModel, { as: 'users', foreignKey: 'realmID' });
      this.hasMany(models.RoleModel, { as: 'roles', foreignKey: 'realmID' });
    }
  }
  RealmModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      titleName: { type: DataTypes.STRING },
      frontEndURL: { type: DataTypes.STRING },
      activated: { type: DataTypes.BOOLEAN, defaultValue: false },
      // filter
      slug: { type: DataTypes.STRING },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'realms',
      modelName: 'Realm',
      timestamps: false,
    }
  );

  return RealmModel;
};

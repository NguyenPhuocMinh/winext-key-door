'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class KeyModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RealmModel, { as: 'realm', foreignKey: 'realmID' });
      this.hasOne(models.ProviderKeyModel, { as: 'key', foreignKey: 'keyID' });
    }
  }
  KeyModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING },
      priority: {
        type: DataTypes.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      useFor: { type: DataTypes.STRING, defaultValue: 'SIGN' },
      keySize: {
        type: DataTypes.ENUM,
        values: ['1024', '2048', '4096'],
        defaultValue: '2048',
      },
      algorithm: {
        type: DataTypes.ENUM,
        values: ['RS256', 'HS256'],
      },
      activated: { type: DataTypes.BOOLEAN, defaultValue: true },
      // filter
      realmName: { type: DataTypes.STRING },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'keys',
      modelName: 'Key',
      timestamps: false,
    }
  );
  return KeyModel;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProviderKeyModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.KeyModel, { as: 'providerKey', foreignKey: 'keyID' });
    }
  }
  ProviderKeyModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'provider_keys',
      modelName: 'ProviderKeyModel',
      timestamps: false,
    }
  );
  return ProviderKeyModel;
};

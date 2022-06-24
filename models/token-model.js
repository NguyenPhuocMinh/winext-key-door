'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TokenModel extends Model {
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
  TokenModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      signature_algorithm: {
        type: DataTypes.ENUM,
        values: ['RS256', 'HS256'],
      },
      expired: { type: DataTypes.STRING },
      // filter
      realmName: { type: DataTypes.STRING },
      deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      created_by: { type: DataTypes.STRING },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_by: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'tokens',
      modelName: 'TokenModel',
      timestamps: false,
    }
  );

  return TokenModel;
};

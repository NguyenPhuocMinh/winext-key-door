'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmailModel extends Model {
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
  EmailModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      port: { type: DataTypes.STRING },
      host: { type: DataTypes.STRING },
      from: { type: DataTypes.STRING },
      fromDisplayName: { type: DataTypes.STRING },
      replyTo: { type: DataTypes.STRING },
      replyToDisplayName: { type: DataTypes.STRING },
      enableSSL: { type: DataTypes.BOOLEAN },
      enableStartTLS: { type: DataTypes.BOOLEAN },
      enableAuthentication: { type: DataTypes.BOOLEAN },
      // filter
      realmName: { type: DataTypes.STRING },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      createdBy: { type: DataTypes.STRING },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedBy: { type: DataTypes.STRING },
    },
    {
      sequelize,
      tableName: 'emails',
      modelName: 'Email',
      timestamps: false,
    }
  );
  return EmailModel;
};

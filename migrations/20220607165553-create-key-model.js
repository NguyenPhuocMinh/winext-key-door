'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('keys', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      priority: {
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 100,
        },
      },
      useFor: { type: Sequelize.STRING },
      provider: { type: Sequelize.STRING },
      providerDescription: { type: Sequelize.STRING },
      keySize: {
        type: Sequelize.ENUM,
        values: ['1024', '2048', '4096'],
        defaultValue: '2048',
      },
      algorithm: {
        type: Sequelize.ENUM,
        values: ['RS256', 'HS256'],
      },
      activated: { type: Sequelize.BOOLEAN },
      realmName: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING },
      deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      createdBy: { type: Sequelize.STRING },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedBy: { type: Sequelize.STRING },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('keys');
  },
};

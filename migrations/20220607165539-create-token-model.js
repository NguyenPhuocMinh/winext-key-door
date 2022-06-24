'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      signature_algorithm: {
        type: Sequelize.ENUM,
        values: ['RS256', 'HS256'],
      },
      expired: { type: Sequelize.STRING },
      realmName: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      createdBy: { type: Sequelize.STRING },
      updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      updatedBy: { type: Sequelize.STRING },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  },
};

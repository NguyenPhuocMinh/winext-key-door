'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emails', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      port: { type: Sequelize.STRING },
      host: { type: Sequelize.STRING },
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
    await queryInterface.dropTable('emails');
  },
};

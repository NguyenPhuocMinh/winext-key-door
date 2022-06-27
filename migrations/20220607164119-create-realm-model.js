'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('realms', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      titleName: { type: Sequelize.STRING },
      activated: { type: Sequelize.BOOLEAN },
      slug: { type: Sequelize.STRING },
      deleted: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      createdBy: { type: Sequelize.STRING },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedBy: { type: Sequelize.STRING },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('realms');
  },
};

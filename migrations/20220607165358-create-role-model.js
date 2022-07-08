'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      activated: { type: Sequelize.BOOLEAN, defaultValue: false },
      // filter
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
    await queryInterface.dropTable('roles');
  },
};

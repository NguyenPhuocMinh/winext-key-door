'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('supper_admin', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      userName: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      //filter
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
    await queryInterface.dropTable('supper_admin');
  },
};

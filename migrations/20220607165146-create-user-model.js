'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
      userName: { type: Sequelize.STRING },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: { type: Sequelize.STRING },
      passwordConfirm: { type: Sequelize.STRING },
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
    await queryInterface.dropTable('users');
  },
};

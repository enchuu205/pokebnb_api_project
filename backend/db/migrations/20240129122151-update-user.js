'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName',
      {
        type: Sequelize.STRING(256),
        allowNull: false
      }
    )
    await queryInterface.addColumn('Users', 'lastName',
      {
        type: Sequelize.STRING(256),
        allowNull: false
      }
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Users', 'firstName');
    queryInterface.removeColumn('Users', 'lastName');
    return
  }
};

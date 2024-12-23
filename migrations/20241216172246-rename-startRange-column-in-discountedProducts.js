'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('discountedProducts', 'statartRange', 'startRange');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('discountedProducts', 'startRange', 'statartRange');
  }
};

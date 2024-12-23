'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_order_paymentType" RENAME TO "enum_order_paymentType_old";
      CREATE TYPE "enum_order_paymentType" AS ENUM('card');
      ALTER TABLE "order" ALTER COLUMN "paymentType" TYPE "enum_order_paymentType" USING "paymentType"::text::"enum_order_paymentType";
      DROP TYPE "enum_order_paymentType_old";
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_order_paymentType" RENAME TO "enum_order_paymentType_old";
      CREATE TYPE "enum_order_paymentType" AS ENUM('cod', 'card');
      ALTER TABLE "order" ALTER COLUMN "paymentType" TYPE "enum_order_paymentType" USING "paymentType"::text::"enum_order_paymentType";
      DROP TYPE "enum_order_paymentType_old";
    `);
  }
};

'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    try {
      // Fetch an order ID and product ID from the database
      const [orders] = await queryInterface.sequelize.query(
        `SELECT id FROM orders LIMIT 1;`
      );
      const [products] = await queryInterface.sequelize.query(
        `SELECT id, price FROM products LIMIT 1;`
      );

      if (!orders || orders.length === 0) {
        console.error('No orders found in the database.');
        return;
      }
      if (!products || products.length === 0) {
        console.error('No products found in the database.');
        return;
      }

      const orderId = orders[0]?.id;
      const productId = products[0]?.id;
      const productPrice = products[0]?.price;

      if (!orderId || !productId) {
        console.error('Failed to retrieve valid order or product IDs.');
        return;
      }

      // Insert into the `OrderItems` table
      return queryInterface.bulkInsert('OrderItems', [
        {
          id: uuidv4(),
          orderId: orderId,
          productId: productId,
          quantity: 2,
          price: productPrice,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error seeding OrderItems:', error);
      throw error;
    }
  },

  async down(queryInterface) {
    try {
      return queryInterface.bulkDelete('OrderItems', null, {});
    } catch (error) {
      console.error('Error removing seeded OrderItems:', error);
      throw error;
    }
  },
};

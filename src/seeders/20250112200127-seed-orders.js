'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface) {
    try {
      // Fetch user IDs from the `users` table
      const [users] = await queryInterface.sequelize.query(
        `SELECT id FROM users LIMIT 1;`
      );

      if (!users || users.length === 0) {
        console.error('No users found in the database.');
        return;
      }

      const userId = users[0]?.id;

      if (!userId) {
        console.error('Failed to retrieve a valid user ID.');
        return;
      }

      // Insert into the `orders` table
      return queryInterface.bulkInsert('orders', [
        {
          id: uuidv4(),
          user_id: userId,
          totalAmount: 100.0,
          status: 'Pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Error seeding orders:', error);
      throw error;
    }
  },

  async down(queryInterface) {
    try {
      return queryInterface.bulkDelete('orders', null, {});
    } catch (error) {
      console.error('Error removing seeded orders:', error);
      throw error;
    }
  },
};

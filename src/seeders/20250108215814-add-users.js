'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [ // Correct table name
      {
        id: uuidv4(),
        email: 'john.doe@example.com',
        password: 'hashedpassword1', // Use hashed passwords in production
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '1234567890',
        address: '123 Main St',
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        email: 'jane.smith@example.com',
        password: 'hashedpassword2',
        firstName: 'Jane',
        lastName: 'Smith',
        phoneNumber: '0987654321',
        address: '456 Elm St',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {}); 
  },
};

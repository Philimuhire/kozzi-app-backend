const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        id: uuidv4(), // Dynamically generate a UUID
        name: 'Rose Bouquet',
        description: 'A beautiful bouquet of fresh roses.',
        image_url: 'https://example.com/rose-bouquet.jpg',
        category: 'flowers',
        price: 35.5,
        quantity: 50,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Garden Tool Set',
        description: 'A complete set of gardening tools for all needs.',
        image_url: 'https://example.com/garden-tool-set.jpg',
        category: 'gardening-tools',
        price: 50,
        quantity: 30,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};

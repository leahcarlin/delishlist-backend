"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("listRests", [
      {
        listId: 1,
        restaurantId: 1,
        visited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 1,
        restaurantId: 3,
        visited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 1,
        restaurantId: 4,
        visited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 3,
        restaurantId: 1,
        visited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 2,
        restaurantId: 2,
        visited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 5,
        restaurantId: 1,
        visited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 4,
        restaurantId: 3,
        visited: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 4,
        restaurantId: 4,
        visited: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("listRests", null, {});
  },
};

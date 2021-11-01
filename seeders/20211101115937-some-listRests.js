"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("listRests", [
      {
        listId: 1,
        restId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 1,
        restId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 1,
        restId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 3,
        restId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 2,
        restId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 5,
        restId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 4,
        restId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 4,
        restId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("listRests", null, {});
  },
};

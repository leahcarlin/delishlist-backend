"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("lists", [
      {
        title: "Dinner in Amsterdam",
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Places for a First Date",
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Italian Restaurants",
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Vegetarian/Vegan",
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Brunch",
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("lists", null, {});
  },
};

"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "A-Test",
          lastName: "User",
          email: "test@test.com",
          password: bcrypt.hashSync("test", SALT_ROUNDS),
          profileImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQey3S6VQ4qIppedXehx8CQYDshaMBwU1UwpQ&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "B-Test",
          lastName: "User",
          email: "b@b.com",
          password: bcrypt.hashSync("b", SALT_ROUNDS),
          profileImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72nARG6ueWpDbDXkXV137m7fVt2ALVshZwg&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "C-Test",
          lastName: "User",
          email: "c@c.com",
          password: bcrypt.hashSync("c", SALT_ROUNDS),
          profileImg:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ72nARG6ueWpDbDXkXV137m7fVt2ALVshZwg&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};

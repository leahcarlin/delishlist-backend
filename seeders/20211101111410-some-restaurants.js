"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Bacalar",
        priceLevel: null,
        rating: 4.7,
        photo:
          "https://lh3.googleusercontent.com/places/AAcXr8phpR7bSjEsGtM3s0QPSCjedDw-SI9LXcoaAWWsRxXVlnBM0XNlCOoA93akGmHlRZ4b-vdrK4R24oYh-QIMaBjuDMZBsnPushM=s1600-w400",
        favorite: false,
        placeId: "ChIJE0H42qQJxkcRphxpuk912EM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mr. Porter",
        priceLevel: null,
        rating: 4.4,
        photo:
          "https://lh5.googleusercontent.com/p/AF1QipMWgiLRqPNUHcSLtLPO3C3XphPlGs8L07n1YCQ=w446-h240-k-no",
        favorite: false,
        placeId: "ChIJM07cr8YJxkcRCRMgL7hvHoY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mata Hari",
        priceLevel: 2,
        rating: 4.3,
        photo:
          "https://lh5.googleusercontent.com/p/AF1QipM5NU03ZoEJcCHXzJfwo3PxVxSR_LaMXrW5GLB4=w408-h272-k-no",
        favorite: false,
        placeId: "ChIJC83Lp7kJxkcR6e4dkMmc6fQ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rijks",
        priceLevel: 3,
        rating: 4.4,
        photo:
          "https://lh5.googleusercontent.com/p/AF1QipPtW-QyTZDtiRnDS8qRoOB6l_uDvZrMnScR-Bmz=w408-h306-k-no",
        favorite: false,
        placeId: "ChIJQdf58O4JxkcReTjTVHWqYFk",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salmeura",
        priceLevel: 2,
        rating: 4.5,
        photo:
          "https://lh5.googleusercontent.com/p/AF1QipPRmG8qCGoYAvMt1beolf8xyIvVawUx6OBZQNlE=w408-h240-k-no-pi0-ya260-ro0-fo100",
        favorite: false,
        placeId: "ChIJ8TC-edsJxkcRJaQoPxTsOmQ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("restaurants", null, {});
  },
};

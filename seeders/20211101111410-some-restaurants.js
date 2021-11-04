"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("restaurants", [
      {
        name: "Bacalar",
        priceLevel: null,
        rating: 4.7,
        photoReference:
          "Aap_uEBt0rHmypNGKZMiVXgN_UexCMGTJruM42UmP6aDqwZzJjl3qUPzmkQN7ZKWm5CV7XMueS-xIFRj6bTyhNxlbFsnaoV86m_leRZdGFM9Dr9ApWGGIviTSAJnsyonhtGdSyc2YcPmDg278yHUhqyC_cTt2q8rg4Sa0HYykP6Eo9ocHsJH",
        placeId: "ChIJE0H42qQJxkcRphxpuk912EM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mr. Porter",
        priceLevel: null,
        rating: 4.4,
        photoReference:
          "Aap_uEDy3t7pdKXJxJy5bB1yPxcGVoWb37dfBHPeteCsxs0c0aLFxXQj4B-sSNT13TuuGIq23OuVapmLD9QKUcd76ls_DId04DYdKgRYoAVXH1-VvKIKcAhSuv-GN2rvn9bOwMVgPnW-We2mmYLLzNrsTb7yEcLsUZzxQ3rGch8Ur0GdXX0",
        placeId: "ChIJM07cr8YJxkcRCRMgL7hvHoY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mata Hari",
        priceLevel: 2,
        rating: 4.3,
        photoReference:
          "Aap_uEAZQORf65HRfS-HzUkJ_UwW5l5ipAIMiVjasv0JMNQzbDfdVT8stVq2d_EmMq0GO0xVzj3A6UxcEmyNHMn0s_0ChPgG0M7DBDe44ZZsEUux3kFrx9EZMKgEE50ZDl1QP868i41xgBm3tJk30RM6crDfgSmJo6YBZrHVe39NqDLYaEYk",
        placeId: "ChIJC83Lp7kJxkcR6e4dkMmc6fQ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rijks",
        priceLevel: 3,
        rating: 4.4,
        photoReference:
          "Aap_uEDPhdiy-S4jjsE9hgy6UgKzVLTmSI_jh96FQUAYiL3kDuxA63hzZheeAFSA_hLloC1sAGNFzez9ygpkSLTdqhfmsveRAr6CKQy2pLjFSksBn3TPQV_tcCcmTorkrnV_t30qet5f4fv-pdTMT1NYC6gd7aa3eW80eVuokJiyXCsysyKH",
        placeId: "ChIJQdf58O4JxkcReTjTVHWqYFk",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Salmeura",
        priceLevel: 2,
        rating: 4.5,
        photoReference:
          "Aap_uECvkC62TNulGqwV9ss0_4sxTUpLK7i0WV_9UXWduLw9zzf0jdWscELOJxtPnarS5g9cehEK4VYHQQZMmpkzNxeeSZQpj2Cl46l7BJlI35PFAl_hQDPGENwLAR6-xQ85veSB9tTXGmxHDWUEV-augeak_CLYurC-oTjySYwImuuIMsbp",
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

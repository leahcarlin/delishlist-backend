"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userRest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userRest.belongsTo(models.user);
      userRest.belongsTo(models.restaurant);
    }
  }
  userRest.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      restaurantId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "userRest",
    }
  );
  return userRest;
};
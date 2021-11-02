"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      restaurant.belongsToMany(models.list, {
        through: "listRests",
        foreignKey: "restaurantId",
      });
    }
  }
  restaurant.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      priceLevel: DataTypes.INTEGER,
      rating: DataTypes.DECIMAL,
      photo: DataTypes.STRING,
      favorite: DataTypes.BOOLEAN,
      placeId: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "restaurant",
    }
  );
  return restaurant;
};

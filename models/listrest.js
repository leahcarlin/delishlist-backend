"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class listRest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      listRest.belongsTo(models.list);
      listRest.belongsTo(models.restaurant);
    }
  }
  listRest.init(
    {
      listId: { type: DataTypes.INTEGER, allowNull: false },
      restId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "listRest",
    }
  );
  return listRest;
};

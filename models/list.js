"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      list.belongsToMany(models.user, {
        through: "collaborators",
        foreignKey: "listId",
      });
      list.belongsToMany(models.restaurant, {
        through: "listRest",
        foreignKey: "listId",
      });
      list.belongsTo(models.user, {
        foreignKey: "ownerId",
      });
    }
  }
  list.init(
    {
      title: { type: DataTypes.STRING, allowNull: false },
      ownerId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "list",
    }
  );
  return list;
};

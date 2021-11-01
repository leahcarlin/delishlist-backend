"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class collaborator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      collaborator.belongsTo(models.list);
      collaborator.belongsTo(models.user);
    }
  }
  collaborator.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      listId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "collaborator",
    }
  );
  return collaborator;
};

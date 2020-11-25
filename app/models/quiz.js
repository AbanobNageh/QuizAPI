const Sequelize = require("sequelize");
const database = require("../common utils/database");

const quizModel = database.define(
  "quiz",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: Sequelize.INTEGER,
    },
    difficulty: {
      type: Sequelize.INTEGER,
    },
  },
  {
    freezeTableName: true,
    tableName: "quizzes",
  }
);

module.exports = quizModel;

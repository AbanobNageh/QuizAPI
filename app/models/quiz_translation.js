const Sequelize = require("sequelize");
const database = require("../common utils/database");

const quizTranslationModel = database.define(
  "quiz_translation",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    // quiz_id: {
    //   type: Sequelize.INTEGER,
    // },
  },
  {
    freezeTableName: true,
    tableName: "quiz_translations",
  }
);

module.exports = quizTranslationModel;

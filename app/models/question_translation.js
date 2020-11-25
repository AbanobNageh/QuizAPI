const Sequelize = require("sequelize");
const database = require("../common utils/database");

const questionTranslationModel = database.define(
  "question_translation",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: Sequelize.STRING,
    },
    answers: {
      type: Sequelize.STRING,
    },
    language: {
      type: Sequelize.STRING,
    },
    // question_id: {
    //   type: Sequelize.INTEGER,
    // },
  },
  {
    freezeTableName: true,
    tableName: "question_translations",
  }
);

module.exports = questionTranslationModel;

const Sequelize = require("sequelize");
const database = require("../common utils/database");

const questionModel = database.define(
  "question",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    correct_answer: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
    // quiz_id: {
    //   type: Sequelize.INTEGER,
    // },
  },
  {
    freezeTableName: true,
    tableName: "questions",
  }
);

module.exports = questionModel;

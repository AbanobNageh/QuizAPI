const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "quiz-development",
  "root",
  "asdqwe123",
  {
    dialect: "mysql",
    host: "localhost",
    dialectOptions: { decimalNumbers: true },
    logging: false,
  }
);

module.exports = sequelize;

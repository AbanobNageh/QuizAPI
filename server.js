const express = require("express");
const dotenv = require("dotenv");
const dotenvParseVariables = require("dotenv-parse-variables");

// read and parse .env file.
let env = dotenv.config({});
if (env.error) throw env.error;
process.env = dotenvParseVariables(env.parsed);

const databaseUtils = require("./app/common utils/database_utils");
const routes = require("./app/V1.0.0/routes/index");

const app = express();
const listeningPort = process.env.APP_PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// user (players & owners) routes.
app.use("/1.0.0/quiz", routes.quizRoutes);

const server = app.listen(listeningPort, async () => {
  try {
    await databaseUtils.initializeDatabase();
    console.log("We are live on port " + listeningPort);
  } catch (error) {
    console.log(error);
  }
});

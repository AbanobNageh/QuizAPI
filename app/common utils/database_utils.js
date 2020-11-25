const fs = require("fs");
const path = require('path');
const database = require("./database");
const controllers = require('../V1.0.0/controllers/index');

module.exports.initializeDatabase = async () => {
  try {
    require("../models/index");
    require("../models/associations");

    if (process.env.FORCE_SYNC_DATABASE == true) {
      await database.sync({ force: true });
      await this.readQuizData();
      console.log("Database initialized with forced sync");
    } else {
      await database.sync();
      console.log("Database initialized without forced sync");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.readQuizData = async () => {
  try {
    const dataFilePath = path.join(__dirname, '../../app/common utils/data.json');
    let rawData = fs.readFileSync(dataFilePath);
    let quizzesData = JSON.parse(rawData);

    for (let quizData of quizzesData) {
      const quizDataEn = quizData.quiz_en;
      const quizDataQuestionsEn = quizData.quiz_en.questions;
      const quizDataAr = quizData.quiz_ar;
      const quizDataQuestionsAr = quizData.quiz_ar.questions;

      delete quizDataEn.questions;
      delete quizDataAr.questions;

      const quiz = await controllers.quizController.addQuiz(quizDataEn, 'en');
      await controllers.quizController.editQuizById(quiz.id, quizDataAr, 'ar');

      for (let index = 0; index < quizDataQuestionsEn.length; index++) {
        const questionData = quizDataQuestionsEn[index];
        const questionDataAr = quizDataQuestionsAr[index];
        questionData.quiz_id = quiz.id;

        const question = await controllers.questionController.addQuestion(questionData, 'en');
        await controllers.questionController.editQuestionById(question.id, questionDataAr, 'ar');
      }
    }

    console.log("Data file loaded");
  } catch (error) {
    console.log(error);
  }
};

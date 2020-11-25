const questionModel = require("./question");
const quizModel = require("./quiz");
const questionTranslationModel = require('./question_translation');
const quizTranslationModel = require('./quiz_translation');

module.exports = {
  questionModel: questionModel,
  quizModel: quizModel,
  questionTranslationModel: questionTranslationModel,
  quizTranslationModel: quizTranslationModel,
};

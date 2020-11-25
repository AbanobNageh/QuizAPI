const translationUtils = require('./translation_utils');

module.exports.getResponseQuestionObjectArray = async (questionsData, language) => {
  const questions = [];

  for (let questionData of questionsData) {
    questions.push(await this.getResponseQuestionObject(questionData, language));
  }

  return questions;
};

module.exports.getResponseQuestionObject = async (questionData, language) => {
  const question = questionData;

  if (question.question_translations == null || question.question_translations.length == 0) {
    throw Error('No translations found for question object of id = ' + question.id);
  }
  else {
    const questionTranslation = await translationUtils.findAvailableTranslation(language, question.question_translations);
    question.question = questionTranslation.question;
    question.answers = questionTranslation.answers;
    delete question.question_translations;
  }

  return question;
};

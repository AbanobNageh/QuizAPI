const translationUtils = require('./translation_utils');
const questionUtils = require('./question_utils');

module.exports.getResponseQuizObjectArray = async (quizzesData, language) => {
  const quizzes = [];

  for (let quizData of quizzesData) {
    quizzes.push(await this.getResponseQuizObject(quizData, language));
  }

  return quizzes;
};

module.exports.getResponseQuizObject = async (quizData, language) => {
  const quiz = quizData;

  if (quiz.quiz_translations == null || quiz.quiz_translations.length == 0) {
    throw Error('No translations found for quiz object of id = ' + quiz.id);
  }
  else {
    const quizTranslation = await translationUtils.findAvailableTranslation(language, quiz.quiz_translations);
    quiz.name = quizTranslation.name;
    quiz.description = quizTranslation.description;

    if (quiz.questions != null && quiz.questions.length > 0) {
      quiz.questions = await questionUtils.getResponseQuestionObjectArray(quiz.questions, language);
    }

    delete quiz.quiz_translations;
  }

  return quiz;
};

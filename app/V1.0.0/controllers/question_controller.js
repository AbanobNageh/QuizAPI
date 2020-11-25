const _ = require("lodash");

const sequelizeUtils = require("../../common utils/index").sequelizeUtils;
const models = require("../../models/index");
const questionUtils = require("../utils/question_utils");
const questionTranslationController = require("../controllers/question_translation_controller");

const questionModel = models.questionModel;

module.exports.addQuestion = async (questionData, language) => {
  const questionTranslationData = {
    language: language,
    question: questionData.question,
    answers: questionData.answers,
  };

  delete questionData.question;
  delete questionData.answers;

  const question = await questionModel.create(questionData);
  questionTranslationData.question_id = question.id;

  await questionTranslationController.addQuestionTranslation(
    questionTranslationData
  );

  return await this.findQuestionById(question.id, language);
};

module.exports.editQuestionById = async (
  questionId,
  newQuestionData,
  language
) => {
  let translationEdited = false;
  const newQuestionTranslationData = {};

  if (newQuestionData.question != null) {
    newQuestionTranslationData.question = newQuestionData.question;
    delete newQuestionData.question;
    translationEdited = true;
  }

  if (newQuestionData.answers != null) {
    newQuestionTranslationData.answers = newQuestionData.answers;
    delete newQuestionData.answers;
    translationEdited = true;
  }

  if (translationEdited == true) {
    await questionTranslationController.editQuestionTranslationByQuestionId(
      questionId,
      language,
      newQuestionTranslationData
    );

    delete newQuestionData.question;
    delete newQuestionData.answers;
  }

  await questionModel.update(newQuestionData, {
    where: {
      id: questionId,
    },
  });

  return await this.findQuestionById(questionId, language);
};

module.exports.deleteQuestionById = async (questionId) => {
  await questionModel.destroy({
    where: {
      id: questionId,
    },
  });
};

module.exports.findQuestionById = async (questionId, language) => {
  let question;

  question = await questionModel.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      id: questionId,
    },
    include: [
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: models.questionTranslationModel,
      },
    ],
  });

  if (question != null) {
    question = await sequelizeUtils.simplifySequelizeObject(question);
    question = await questionUtils.getResponseQuestionObject(
      question,
      language
    );
  }

  return question;
};

module.exports.findQuestionsByQuizId = async (
  paginationData,
  quizId,
  language
) => {
  let offset = 0;
  let limit = 25;
  let questions;

  if (paginationData.page_number != null && paginationData.page_size != null) {
    offset = (paginationData.page_number - 1) * paginationData.page_size;
    limit = paginationData.page_size;
  }

  questions = await questionModel.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      quiz_id: quizId,
    },
    limit: limit,
    offset: offset,
    include: [
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: models.questionTranslationModel,
      },
    ],
  });

  if (questions != null) {
    questions = await sequelizeUtils.simplifySequelizeObjectArray(questions);
    questions = await questionUtils.getResponseQuestionObjectArray(
      questions,
      language
    );
  }

  return questions;
};

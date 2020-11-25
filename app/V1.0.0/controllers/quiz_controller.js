const _ = require("lodash");

const sequelizeUtils = require("../../common utils/index").sequelizeUtils;
const models = require("../../models/index");
const quizUtils = require("../utils/quiz_utils");
const quizTranslationController = require("../controllers/quiz_translation_controller");

const quizModel = models.quizModel;

module.exports.addQuiz = async (quizData, language) => {
  const quizTranslationData = {
    language: language,
    name: quizData.name,
    description: quizData.description,
  };

  delete quizData.name;
  delete quizData.description;

  const quiz = await quizModel.create(quizData);
  quizTranslationData.quiz_id = quiz.id;

  await quizTranslationController.addQuizTranslation(quizTranslationData);

  return await this.findQuizById(quiz.id, language);
};

module.exports.editQuizById = async (quizId, newQuizData, language) => {
  let translationEdited = false;
  const newQuizTranslationData = {};

  if (newQuizData.name != null) {
    newQuizTranslationData.name = newQuizData.name;
    delete newQuizData.name;
    translationEdited = true;
  }

  if (newQuizData.description != null) {
    newQuizTranslationData.description = newQuizData.description;
    delete newQuizData.description;
    translationEdited = true;
  }

  if (translationEdited == true) {
    await quizTranslationController.editQuizTranslationByQuizId(
      quizId,
      language,
      newQuizTranslationData
    );

    delete newQuizData.name;
    delete newQuizData.description;
  }

  await quizModel.update(newQuizData, {
    where: {
      id: quizId,
    },
  });

  return await this.findQuizById(quizId, language);
};

module.exports.deleteQuizById = async (quizId) => {
  await quizModel.destroy({
    where: {
      id: quizId,
    },
  });
};

module.exports.findQuizById = async (quizId, language) => {
  let quiz;

  quiz = await quizModel.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    where: {
      id: quizId,
    },
    include: [
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: models.quizTranslationModel,
      },
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: models.questionModel,
        as: "questions",
        include: [
          {
            attributes: { exclude: ["createdAt", "updatedAt"] },
            model: models.questionTranslationModel,
          },
        ],
      },
    ],
  });

  if (quiz != null) {
    quiz = await sequelizeUtils.simplifySequelizeObject(quiz);
    quiz = await quizUtils.getResponseQuizObject(quiz, language);
  }

  return quiz;
};

module.exports.findQuizzes = async (paginationData, language) => {
  let offset = 0;
  let limit = 25;
  let quizzes;

  if (paginationData.page_number != null && paginationData.page_size != null) {
    offset = (paginationData.page_number - 1) * paginationData.page_size;
    limit = paginationData.page_size;
  }

  quizzes = await quizModel.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    limit: limit,
    offset: offset,
    include: [
      {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        model: models.quizTranslationModel,
      },
    ],
  });

  if (quizzes != null) {
    quizzes = await sequelizeUtils.simplifySequelizeObjectArray(quizzes);
    quizzes = await quizUtils.getResponseQuizObjectArray(quizzes, language);
  }

  return quizzes;
};

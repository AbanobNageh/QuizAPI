const sequelizeUtils = require("../../common utils/index").sequelizeUtils;
const models = require("../../models/index");

const questionTranslationModel = models.questionTranslationModel;

module.exports.addQuestionTranslation = async (questionTranslationData) => {
  const questionTranslation = await questionTranslationModel.create(
    questionTranslationData
  );
  return await sequelizeUtils.simplifyCreatedSequelizeObject(
    questionTranslation
  );
};

module.exports.editQuestionTranslationByQuestionId = async (
  questionId,
  language,
  newQuestionTranslationData
) => {
  if (await this.isTranslationLanguageAvailable(questionId, language)) {
    await questionTranslationModel.update(newQuestionTranslationData, {
      where: {
        question_id: questionId,
        language: language,
      },
    });
  } else {
    newQuestionTranslationData.question_id = questionId;
    newQuestionTranslationData.language = language;
    await questionTranslationModel.create(newQuestionTranslationData);
  }
};

module.exports.isTranslationLanguageAvailable = async (questionId, language) => {
  const translation = await questionTranslationModel.findOne({
    where: {
      question_id: questionId,
      language: language,
    },
  });

  if (translation) {
    return true;
  }

  return false;
};

module.exports.findAvailableLanguagesByQuestionId = async (questionId) => {
  let questionTranslations = await questionTranslationModel.findAll({
    where: {
      question_id: questionId,
    }
  });

  questionTranslations = await sequelizeUtils.simplifySequelizeObjectArray(questionTranslations);

  const questionLanguages = [];

  for (let questionTranslation of questionTranslations) {
    questionLanguages.push(questionTranslation.language);
  }

  return questionLanguages;
};

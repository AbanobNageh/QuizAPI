const sequelizeUtils = require("../../common utils/index").sequelizeUtils;
const models = require("../../models/index");

const quizTranslationModel = models.quizTranslationModel;

module.exports.addQuizTranslation = async (quizTranslationData) => {
  const quizTranslation = await quizTranslationModel.create(
    quizTranslationData
  );
  return await sequelizeUtils.simplifyCreatedSequelizeObject(
    quizTranslation
  );
};

module.exports.editQuizTranslationByQuizId = async (
  quizId,
  language,
  newQuizTranslationData
) => {
  if (await this.isTranslationLanguageAvailable(quizId, language)) {
    await quizTranslationModel.update(newQuizTranslationData, {
      where: {
        quiz_id: quizId,
        language: language,
      },
    });
  } else {
    newQuizTranslationData.quiz_id = quizId;
    newQuizTranslationData.language = language;
    await quizTranslationModel.create(newQuizTranslationData);
  }
};

module.exports.isTranslationLanguageAvailable = async (quizId, language) => {
  const translation = await quizTranslationModel.findOne({
    where: {
      quiz_id: quizId,
      language: language,
    },
  });

  if (translation) {
    return true;
  }

  return false;
};

module.exports.findAvailableLanguagesByQuizId = async (quizId) => {
  let quizTranslations = await quizTranslationModel.findAll({
    where: {
      quiz_id: quizId,
    }
  });

  quizTranslations = await sequelizeUtils.simplifySequelizeObjectArray(quizTranslations);

  const quizLanguages = [];

  for (let quizTranslation of quizTranslations) {
    quizLanguages.push(quizTranslation.language);
  }

  return quizLanguages;
};

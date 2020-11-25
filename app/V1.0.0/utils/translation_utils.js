// this function returns the desired language if it is available of the first available language if the desired
// language is not available.
module.exports.findAvailableTranslation = async (
  desiredLanguage,
  availableTranslations
) => {
  if (
    desiredLanguage == null ||
    availableTranslations == null ||
    availableTranslations.length == 0
  ) {
    throw Error("translation input data is null");
  }

  for (let availableTranslation of availableTranslations) {
    if (availableTranslation.language === desiredLanguage) {
      return availableTranslation;
    }
  }

  return availableTranslations[0];
};

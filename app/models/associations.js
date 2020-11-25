const models = require('./index');

// models.quizTranslationModel.belongsTo(models.quizModel, { foreignKey: 'quiz_id' });
models.quizModel.hasMany(models.quizTranslationModel, { foreignKey: 'quiz_id', onDelete: 'CASCADE' });

// models.questionTranslationModel.belongsTo(models.questionModel, { foreignKey: 'player_id' });
models.questionModel.hasMany(models.questionTranslationModel, { foreignKey: 'question_id', onDelete: 'CASCADE' });

models.questionModel.belongsTo(models.quizModel, { foreignKey: 'quiz_id', as: "quiz" });
models.quizModel.hasMany(models.questionModel, { foreignKey: 'quiz_id', as: "questions" });
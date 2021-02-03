const express = require("express");

const quizController = require("../controllers/quiz_controller");

const commonUtils = require("../../common utils/index");

const errorUtils = commonUtils.errorUtils;

const quizRouter = express.Router();

// TODO: add user authentication.
quizRouter.get("/quizzes", async (req, res) => {
  try {
    const pageNumber = Number(req.query.page_number);
    const pageSize = Number(req.query.page_size);
    const language = String(req.query.language);

    const paginationData = {
      page_number: pageNumber,
      page_size: pageSize,
    };

    if (!language) {
      return res.status(404).send("Language code is not provided");
    }

    if (language !== "en" && language !== "ar") {
      return res
        .status(404)
        .send(
          {
            error_code: 0,
            error_message: "This API currently only supports english (code = en) and arabic (code = ar)"
          }
        );
    }

    (
      await errorUtils.getErrorObject(
        errorCodes.UNKNOWN_ERROR,
        req.user_language
      )
    )

    const quizzes = await quizController.findQuizzes(paginationData, language);
    res.status(200).send(quizzes);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(
        await errorUtils.getErrorObject(
          errorCodes.UNKNOWN_ERROR,
          req.user_language
        )
      );
  }
});

quizRouter.get("/quiz", async (req, res) => {
  try {
    const quizId = Number(req.query.quiz_id);
    const language = String(req.query.language);

    if (!language) {
      return res.status(404).send("Language code is not provided");
    }

    if (language !== "en" && language !== "ar") {
      return res
        .status(404)
        .send(
          {
            error_code: 0,
            error_message: "This API currently only supports english (code = en) and arabic (code = ar)"
          }
        );
    }

    const quiz = await quizController.findQuizById(quizId, language);
    res.status(200).send(quiz);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send(
        await errorUtils.getErrorObject(
          errorCodes.UNKNOWN_ERROR,
          req.user_language
        )
      );
  }
});

module.exports = quizRouter;

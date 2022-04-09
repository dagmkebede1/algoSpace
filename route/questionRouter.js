const express = require("express");
const Router = express.Router();
const AuthController = require("../controller/AuthController");
const questionController = require("../controller/questionController");

Router.use(AuthController.protect);

Router.route("/algoNet/Question")
  .post(questionController.postQuestion)
  .get(questionController.getAllQuestions);

Router.route("/algoNet/Question/:queId")
  .patch(questionController.editPost)
  .get(questionController.getQuestion);
module.exports = Router;

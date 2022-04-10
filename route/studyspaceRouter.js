const express = require("express");
const Router = express.Router();
const studySpaceController = require("../controller/studyspaceController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.protect);

Router.route("/studyspace").post(
  AuthController.restrictTo("admin"),
  studySpaceController.createSpace
);

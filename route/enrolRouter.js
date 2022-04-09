const express = require("express");
const Router = express.Router();
const AuthController = require("../controller/AuthController");
const enrolController = require("../controller/enrolController");

//RECIVING THE ENROLED STUDENT ALONG THEIR COURSES

Router.route("/enrol").get(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  enrolController.findAllEnrol
);
Router.route("/course/:id/enrol").post(
  AuthController.protect,
  enrolController.createEnrol
);
Router.route("/enrol/:id").delete(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  enrolController.deleteEnrol
);

module.exports = Router;

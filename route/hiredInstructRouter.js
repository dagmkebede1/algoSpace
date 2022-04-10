const express = require("express");
const Router = express.Router();
const AuthController = require("../controller/AuthController");
const HiredInstructorController = require("../controller/hiredInstructorController");

//RECIVING THE ENROLED STUDENT ALONG THEIR COURSES

Router.route("/getHireRequest").get(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  HiredInstructorController.findAllHired
);
Router.route("/course/:id/Gethired").post(
  AuthController.protect,
  HiredInstructorController.beHired
);
Router.route("/hireInstructor/:id").delete(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  HiredInstructorController.deleteHired
);
Router.route("/hireInstructor/:id/authorize").patch(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  HiredInstructorController.autorizeHired
);
module.exports = Router;

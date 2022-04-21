const express = require("express");
const Router = express.Router({ mergeParams: true });
const courseController = require("../controller/courseController");
const AuthController = require("../controller/AuthController");

//COURSE ROUTE
Router.route("/course")
  .get(courseController.findAllCourse)
  .post(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    courseController.createCourse
  );
Router.route("/course/:id")
  .get(courseController.findCourse)
  .patch(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    courseController.updateCourse
  )
  .delete(
    AuthController.protect,
    AuthController.restrictTo("admin"),
    courseController.deleteCourse
  );

module.exports = Router;

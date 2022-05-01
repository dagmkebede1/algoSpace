const express = require("express");
const Router = express.Router({ mergeParams: true });
const courseController = require("../controller/courseController");
const AuthController = require("../controller/AuthController");

//COURSE ROUTE
Router.route("/course")
  .get(AuthController.protect, courseController.findAllCourse)
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
Router.route("/course-inst/:id").get(
  AuthController.protect,
  courseController.courseToBeApplied
);
Router.route("/course/:id/edit").get(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  courseController.updateCoursePage
);
Router.route("/Students/course/add").get(
  AuthController.protect,
  AuthController.restrictTo("admin"),
  courseController.addCoursePage
);
module.exports = Router;

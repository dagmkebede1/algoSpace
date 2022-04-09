const express = require("express");
const Router = express.Router();
const userController = require("../controller/userController");
const AuthController = require("../controller/AuthController");

//REGULAR User Activity
//protecting the activity
Router.use(AuthController.protect);
//1) updating his profiles!
Router.route("/user/updateMe").patch(userController.updateMe);
//2) Deleting himself
Router.route("/user/deleteMe").delete(userController.deleteMe);
//3) THE ME ROUTE
Router.route("/me").get(userController.getMe);

//ONLY FOR ADMIN
Router.use(AuthController.restrictTo("admin"));
Router.route("/Users").get(userController.findAlluser);
Router.route("/Users/:id")
  .get(userController.getUser)
  .patch(userController.updateUserRole)
  .delete(userController.deleteUser);
//exporting it
module.exports = Router;

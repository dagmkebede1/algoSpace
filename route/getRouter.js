const express = require("express");
const Router = express.Router();
const getController = require("../controller/getController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.isLoggedIn);

Router.route("/home").get(getController.getSingle);
Router.route("/").get(AuthController.protect, getController.getBase);
Router.route("/login").get(getController.getLogIn);
Router.route("/signup").get(getController.getSignup);

module.exports = Router;

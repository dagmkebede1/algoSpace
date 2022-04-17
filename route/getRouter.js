const express = require("express");
const Router = express.Router();
const getController = require("../controller/getController");
const AuthController = require("../controller/AuthController");

Router.use(AuthController.isLoggedIn);
Router.route("/").get(getController.getSingle);
Router.route("/login").get(getController.getLogIn);
Router.route("/signup").get(getController.getSignup);

module.exports = Router;

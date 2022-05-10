const express = require("express");
const Router = express.Router();
const getController = require("../controller/getController");
const AuthController = require("../controller/AuthController");

// Router.use(AuthController.isLoggedIn);

Router.route("/ho").get(AuthController.isLoggedIn, getController.getSingle);
Router.route("/home").get(AuthController.protect, getController.getBase);
Router.route("/login").get(getController.getLogIn);
Router.route("/signup").get(getController.getSignup);
//ALGONET
Router.route("/algonet").get(
  AuthController.protect,
  getController.getAlgoNetHome
);

Router.route("/algonet/ask").get(AuthController.protect, getController.Ask);

module.exports = Router;

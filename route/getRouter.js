const express = require("express");
const Router = express.Router();
const getController = require("../controller/getController");

Router.route("/login").get(getController.getLogIn);

module.exports = Router;

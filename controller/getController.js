const CatchAsync = require("../utils/CatchAsync");

exports.getLogIn = CatchAsync(async (req, res, next) => {
  res.status(200).render("login");
});
exports.getSignup = CatchAsync(async (req, res, next) => {
  res.status(200).render("signup");
});
exports.getBase = CatchAsync(async (req, res, next) => {
  res.status(200).render("base");
});
exports.getSingle = CatchAsync(async (req, res, next) => {
  res.status(200).render("single");
});

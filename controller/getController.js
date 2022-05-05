const CatchAsync = require("../utils/CatchAsync");
const User = require("../model/users");

exports.getLogIn = CatchAsync(async (req, res, next) => {
  res.status(200).render("login");
});
exports.getSignup = CatchAsync(async (req, res, next) => {
  res.status(200).render("signup");
});
exports.getBase = CatchAsync(async (req, res, next) => {
  const id = req.user.id;
  const currentUser = await User.findById({ _id: id });
  res.status(200).render("base", { currentUser: currentUser });
});
exports.getSingle = CatchAsync(async (req, res, next) => {
  res.status(200).render("single");
});

exports.getManage = CatchAsync(async (req, res) => {
  const currentUser = req.user;
  res.status(200).render("manage", { currentUser });
});

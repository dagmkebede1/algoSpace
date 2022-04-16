const CatchAsync = require("../utils/CatchAsync");

exports.getLogIn = CatchAsync(async (req, res, next) => {
  res.status(200).render("login");
});

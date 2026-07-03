const { verifyToken } = require("../service/auth");

function guestOnly(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return next();
  }

  const payload = verifyToken(token);

  if (payload) {
    return res.redirect("/");
  }

  res.clearCookie("token");
  next();
}

module.exports = guestOnly;

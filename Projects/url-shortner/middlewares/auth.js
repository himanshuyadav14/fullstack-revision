const { verifyToken } = require("../service/auth.js");
function authenticate(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.redirect("/login");
  }

  const payload = verifyToken(token);
  if (!payload) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
  req.userId = payload.userId;
  req.role = payload.role || "user";
  next();
}

module.exports = { authenticate };

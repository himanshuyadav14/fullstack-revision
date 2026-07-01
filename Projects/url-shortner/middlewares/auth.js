const { getUserFromSession } = require("../service/auth.js");
async function authenticate(req, res, next) {
  const sessionId = req.cookies?.uid;
  if (!sessionId) {
    return res.redirect("/login");
  }
  const userId = getUserFromSession(sessionId);
  if (!userId) {
    return res.redirect("/login");
  }
  req.userId = userId;
  next();
}

module.exports = { authenticate };

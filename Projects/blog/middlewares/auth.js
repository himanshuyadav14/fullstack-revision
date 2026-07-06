const { verifyToken } = require("../services/auth");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies?.[cookieName] || "";
    console.log("tokenCookieValue", tokenCookieValue);
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = verifyToken(tokenCookieValue);
      console.log("userPayload", userPayload);
      req.user = userPayload;
    } catch (error) {}
    next();
  };
}

module.exports = { checkForAuthenticationCookie };

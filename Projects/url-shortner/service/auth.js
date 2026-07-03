const jwt = require("jsonwebtoken");
const JWT_SECRET = "dev-secret-himanshu-url-shortner-123";

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id.toString(), email: user.email },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };

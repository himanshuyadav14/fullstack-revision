const jwt = require("jsonwebtoken");

const JWT_SECRET = "secret";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };

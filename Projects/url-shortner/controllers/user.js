const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

const { addUserToSession } = require("../service/auth");
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await User.create({ name, email, password });
  res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "User not found" });
  }
  const sessionId = uuidv4();
  addUserToSession(sessionId, user._id.toString());
  res.cookie("uid", sessionId);
  res.redirect("/");
};

module.exports = { handleUserSignup, handleUserLogin };

const User = require("../models/user");
const { generateToken } = require("../service/auth");

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.render("signup", { error: "All fields are required" });
  }
  try {
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.cookie("token", token, cookieOptions);
    res.redirect("/");
  } catch (err) {
    if (err.code === 11000) {
      return res.render("signup", { error: "Email is already registered" });
    }
    return res.render("signup", {
      error: "Something went wrong, Please Try again later.",
    });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "User not found" });
  }

  const token = generateToken(user);
  res.cookie("token", token, cookieOptions);
  res.redirect("/");
};

const handleUserLogout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
};

module.exports = { handleUserSignup, handleUserLogin, handleUserLogout };

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateToken } = require("../services/auth");

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.render("signin", { error: "Invalid email" });
  }
  if (await user.comparePassword(password)) {
    const token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });
    return res.redirect("/");
  }
  return res.render("signin", { error: "Invalid password" });
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    await User.create({ fullName, email, password });
    console.log("User created successfully");
    return res.redirect("/user/signin");
  } catch (error) {
    return res.render("signup", { error: error.message });
  }
});

router.get("/signout", async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  return res.redirect("/user/signin");
});

module.exports = router;

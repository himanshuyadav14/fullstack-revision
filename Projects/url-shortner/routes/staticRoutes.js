const express = require("express");
const Url = require("../models/url");
const { authenticate } = require("../middlewares/auth.js");
const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  const urls = await Url.find({ createdBy: req.userId });
  return res.render("home", { urls, id: req.query.id });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

module.exports = router;

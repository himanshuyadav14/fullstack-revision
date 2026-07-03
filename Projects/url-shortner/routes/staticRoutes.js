const express = require("express");
const Url = require("../models/url");
const { authenticate } = require("../middlewares/auth.js");
const router = express.Router();

const guestOnly = require("../middlewares/guestOnly");

router.get("/", authenticate, async (req, res) => {
  const urls = await Url.find({ createdBy: req.userId });
  return res.render("home", { urls, id: req.query.id, error: req.query.error });
});

router.get("/signup", guestOnly, (req, res) => {
  return res.render("signup");
});

router.get("/login", guestOnly, (req, res) => {
  return res.render("login");
});

module.exports = router;

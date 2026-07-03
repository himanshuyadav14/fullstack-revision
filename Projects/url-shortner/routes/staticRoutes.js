const express = require("express");
const Url = require("../models/url");
const { authenticate } = require("../middlewares/auth.js");
const { requireAdmin } = require("../middlewares/requireAdmin.js");
const { getAllUrls } = require("../controllers/url");
const router = express.Router();

const guestOnly = require("../middlewares/guestOnly");

router.get("/", authenticate, async (req, res) => {
  const urls = await Url.find({ createdBy: req.userId });
  return res.render("home", {
    urls,
    id: req.query.id,
    error: req.query.error,
    success: req.query.success,
    role: req.role,
  });
});

router.get("/admin/urls", authenticate, requireAdmin, getAllUrls);

router.get("/signup", guestOnly, (req, res) => {
  return res.render("signup");
});

router.get("/login", guestOnly, (req, res) => {
  return res.render("login");
});

module.exports = router;

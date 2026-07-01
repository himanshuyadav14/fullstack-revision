const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth.js");

const {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
} = require("../controllers/url");

router.post("/", authenticate, generateShortUrl);
router.get("/analytics/:id", authenticate, getAnalytics);
router.get("/:id", redirectToUrl);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
} = require("../controllers/url");

router.post("/", generateShortUrl);
router.get("/analytics/:id", getAnalytics);
router.get("/:id", redirectToUrl);

module.exports = router;

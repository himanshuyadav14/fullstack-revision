const express = require("express");
const router = express.Router();

const {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
} = require("../controllers/url");

router.post("/", generateShortUrl);
router.get("/:id", redirectToUrl);
router.get("/analytics/:id", getAnalytics);

module.exports = router;

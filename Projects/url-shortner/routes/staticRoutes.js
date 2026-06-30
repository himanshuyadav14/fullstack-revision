const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await Url.find({});
  return res.render("home", { urls, id: req.query.id });
});

module.exports = router;

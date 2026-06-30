const express = require("express");
const Url = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
  const urls = await Url.find({});
  console.log(urls);
  return res.render("home", { urls });
});

module.exports = router;

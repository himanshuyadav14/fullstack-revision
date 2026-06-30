const { nanoid } = require("nanoid");
const Url = require("../models/url");

const generateShortUrl = async (req, res) => {
  const urls = await Url.find({});
  const redirectUrl = req.body.url?.trim();

  if (!redirectUrl) {
    return res.status(400).render("home", {
      urls,
      error: "URL is required",
    });
  }

  const shortId = nanoid(8);
  await Url.create({
    shortId,
    redirectUrl,
    visitHistory: [],
  });

  const allUrls = await Url.find({});
  return res.status(201).render("home", { id: shortId, urls: allUrls });
};

const redirectToUrl = async (req, res) => {
  const shortId = req.params.id;
  if (!shortId) return res.status(400).json({ error: "Short ID is required" });
  const url = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true },
  );

  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }
  return res.redirect(url.redirectUrl);
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.id;
  if (!shortId) return res.status(400).json({ error: "Short ID is required" });

  const result = await Url.findOne({ shortId });
  if (!result) return res.status(404).json({ error: "URL not found" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
module.exports = {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
};

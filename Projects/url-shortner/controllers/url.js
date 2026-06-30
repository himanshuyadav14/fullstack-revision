const { nanoid } = require("nanoid");
const Url = require("../models/url");

const generateShortUrl = async (req, res) => {
  const redirectUrl = req.body.url;
  if (!redirectUrl)
    return res
      .status(400)
      .json({ status: "failed", message: "URL is Required!!" });

  const shortId = nanoid(8);
  await Url.create({
    shortId,
    redirectUrl,
    visitHistory: [],
  });
  res.status(201).json({ status: "success", id: shortId });
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

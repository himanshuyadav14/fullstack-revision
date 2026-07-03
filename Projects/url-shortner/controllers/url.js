const { nanoid } = require("nanoid");
const Url = require("../models/url");

const generateShortUrl = async (req, res) => {
  const redirectUrl = req.body.url?.trim();

  if (!redirectUrl) {
    return res.redirect("/?error=URL+is+required");
  }

  const shortId = nanoid(8);
  await Url.create({
    shortId,
    redirectUrl,
    visitHistory: [],
    createdBy: req.userId,
  });

  return res.redirect(`/?id=${shortId}`);
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

  const result = await Url.findOne({ shortId, createdBy: req.userId });
  if (!result) return res.status(404).json({ error: "URL not found" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

const deleteUrl = async (req, res) => {
  const { shortId } = req.params;

  const deleted = await Url.findOneAndDelete({
    shortId,
    createdBy: req.userId, // ← Authorization: sirf owner
  });

  if (!deleted) {
    return res.redirect("/?error=URL+not+found+or+not+allowed");
  }

  return res.redirect("/?success=URL+deleted");
};

const getAllUrls = async (req, res) => {
  const urls = await Url.find({})
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
  return res.render("admin", { urls });
};

module.exports = {
  generateShortUrl,
  redirectToUrl,
  getAnalytics,
  deleteUrl,
  getAllUrls,
};

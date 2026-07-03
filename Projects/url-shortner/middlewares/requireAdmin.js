function requireAdmin(req, res, next) {
  if (req.role !== "admin") {
    return res.redirect("/?error=Forbidden%3A+Admin+access+required");
  }
  next();
}

module.exports = { requireAdmin };

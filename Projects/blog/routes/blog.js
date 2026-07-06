const express = require("express");
const router = express.Router();
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");

const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(`./public/uploads/${req.user.id}`);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.get("/add-blog", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate(
    "createdBy",
    "fullName profileImageUrl",
  );

  if (!blog) {
    return res.status(404).render("blogDetail", {
      user: req.user,
      error: "Blog not found",
    });
  }

  return res.render("blogDetail", { user: req.user, blog });
});

router.post("/add-blog", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  try {
    const blog = await Blog.create({
      title,
      body,
      coverImageUrl: `uploads/${req.user.id}/${req.file.filename}`,
      createdBy: req.user.id,
    });
    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    return res.render("addBlog", { user: req.user, error: error.message });
  }
});

module.exports = router;

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("createdBy", "fullName profileImageUrl")
    .sort({ createdAt: -1 });
  return res.render("homepage", { user: req.user, blogs });
});

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

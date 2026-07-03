const express = require("express");
const path = require("path");
const connectDB = require("./connection");
const cookieParser = require("cookie-parser");

//Routes Import
const urlRoutes = require("./routes/url");
const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/user");

const app = express();

const PORT = 3000;

connectDB("mongodb://127.0.0.1:27017/url-shortner");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/url", urlRoutes);
app.use("/", staticRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

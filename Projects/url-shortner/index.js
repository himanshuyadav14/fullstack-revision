const express = require("express");
const connectDB = require("./connection");

//Routes Import
const urlRoutes = require("./routes/url");

const app = express();
const PORT = 3000;

connectDB("mongodb://127.0.0.1:27017/url-shortner");

app.use(express.json());
app.use("/url", urlRoutes);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));

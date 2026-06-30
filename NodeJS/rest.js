const express = require("express");
const fs = require("fs");
const connectMongoDB = require("./config");

const userRouter = require("./routes/user");

const app = express();

connectMongoDB("mongodb://127.0.0.1:27017/youtube-app-1");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

app.listen(3000, () => {
  console.log(`Server is listening on ${3000}`);
});

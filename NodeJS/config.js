const mongoose = require("mongoose");

async function connectMongoDB(url) {
  console.log(url);
  return mongoose.connect(url);
}

module.exports = connectMongoDB;

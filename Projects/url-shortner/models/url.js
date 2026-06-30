const mongoose = require("mongoose");

const urlScheme = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

const Url = mongoose.model("Url", urlScheme);
module.exports = Url;

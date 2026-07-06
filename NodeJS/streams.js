const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  //   fs.readFile("./sample.txt", "utf8", (err, data) => {
  //     res.send(data);
  //   });

  const stream = fs.createReadStream("./sample.txt", { encoding: "utf8" });
  stream.on("data", (chunk) => {
    console.log(chunk);
    res.write(chunk);
  });
  stream.on("end", () => {
    console.log("End of file");
  });
  stream.on("error", (err) => {
    console.log(err);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

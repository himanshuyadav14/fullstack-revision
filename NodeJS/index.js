const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const log = `${Date.now()}: ${req.url} Request Received\n`;
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }
    switch (req.url) {
      case "/about":
        res.end("About");
        break;
      case "/":
        res.end("Home");
        break;
      default:
        res.statusCode = 404;
        res.end("404 Not found");
    }
  });
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

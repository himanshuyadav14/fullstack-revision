const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} Request Received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("./log.txt", log, (err) => {
    if (err) {
      console.error("Failed to write log:", err);
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }
    switch (myUrl.pathname) {
      case "/":
        res.end("Home");
        break;
      case "/about":
        const username = myUrl.query.name;
        res.end(`About ${username}`);
        break;
      case "/search":
        const search = myUrl.query.search_query;
        res.end(`Here is your search for ${search}`);
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

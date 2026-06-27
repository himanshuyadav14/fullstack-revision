const http = require("http");
const fs = require("fs");
const url = require("url");

function myHandler() {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} ${req.url} Request Received\n`;
  const myUrl = url.parse(req.url, true);
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
      case "/signup":
        if (req.method === "GET") res.end("This is a signup form");
        else if (req.method === "POST") {
          res.end("success");
        }
        break;
      default:
        res.statusCode = 404;
        res.end("404 Not found");
    }
  });
}

const server = http.createServer(myHandler);

server.listen(3000, () => {
  console.log("Server started on port 3000");
});

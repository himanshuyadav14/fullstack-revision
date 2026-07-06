const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.emit("message", {
    text: "Welcome to the chat!",
    type: "server",
  });

  socket.on("user-message", (message) => {
    io.emit("message", {
      text: message,
      senderId: socket.id,
      type: "user",
    });
    console.log(message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});
server.listen(9000, () => {
  console.log("Server is running on port 9000");
});

const express = require("express");
const users = require("./utils/MOCK_DATA.json");

const app = express();
const PORT = 3000;

app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
      `;
  res.send(html);
});

//Rest API Routes
app.get("/api/users", (req, res) => {
  res.status(200).json({ status: "success", data: users });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const userId = Number(req.params.id);
    const user = users.find((user) => user.id === userId);
    res.status(200).json({ status: "success", data: user });
  })
  .patch((req, res) => {
    //TODO: edit the user with id
    res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //TODO: delete the user with id
    res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //TODO: create new user
  res.json({ status: "pending" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

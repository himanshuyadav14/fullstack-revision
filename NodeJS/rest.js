const express = require("express");
const fs = require("fs");
const users = require("./utils/MOCK_DATA.json");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  fs.writeFile("./utils/MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) throw err;
    res.json({ status: "success", message: "User Created!!", id: user.id });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

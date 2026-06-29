const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./utils/MOCK_DATA.json");

const app = express();

// Origin ------> Tuple (Scheme, Host or PORT)
const PORT = 3000;

//Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("user", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `\n${Date.now()}: ${req.method} ${req.path} (${req.ip})`,
    (err, data) => {
      if (err) return res.json({ status: "failed" });
      next();
    },
  );
});

app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
      </ul>
      `;

  res.send(html);
});

//Rest API Routes
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  res.setHeader("X-name", "Himanshu"); // Always add X to custom headers
  res.status(200).json({ status: "success", data: allDbUsers });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.status(200).json({ status: "success", data: user });
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      lastName: "Changed",
    });

    res.json({ status: "pending", data: user });
  })
  .delete((req, res) => {
    //TODO: delete the user with id
    res.json({ status: "pending" });
  });

app.post("/api/users", async (req, res) => {
  const user = req.body;
  if (
    !user.first_name ||
    !user.last_name ||
    !user.email ||
    !user.gender ||
    !user.job_title
  ) {
    return res
      .status(400)
      .json({ status: "failed", message: "All fields are required" });
  }

  const result = await User.create({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    gender: user.gender,
    jobTitle: user.jobTitle,
  });

  console.log(result);

  res.status(201).json({ message: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

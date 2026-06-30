const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});
  res.setHeader("X-name", "Himanshu"); // Always add X to custom headers
  res.status(200).json({ status: "success", data: allDbUsers });
});

router
  .route("/:id")
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

router.post("/", async (req, res) => {
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

module.exports = router;

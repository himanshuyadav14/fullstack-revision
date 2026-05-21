const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
];

const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User found", user });
};

const createUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.name = name;
  res.status(200).json({ message: "User updated", user });
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  users = users.filter((user) => user.id !== userId);
  res.status(200).json({ message: "User deleted" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

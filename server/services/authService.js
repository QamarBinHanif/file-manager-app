const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (username, password, email) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists.");
  }
  const user = new User({ username, password, email });
  return await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { user, token };
};

module.exports = { register, login };

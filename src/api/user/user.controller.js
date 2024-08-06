const createOne = require("../../operations/user/createOne");
const bcrypt = require("bcryptjs");
const findOne = require("../../operations/user/findOne");
const jwt = require("jsonwebtoken");
const User = require("./user.model");

const Secret_key = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);
  req.body.password = bcryptPassword;
  req.body.confirmPassword = bcryptPassword;
  try {
    const newUser = await createOne(req?.body);
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const singinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exisUser = await findOne({ email: email });
    if (!exisUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, exisUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      {
        user: {
          id: exisUser._id,
          email: exisUser.email,
          password: exisUser?.password,
        },
      },
      Secret_key,
      { expiresIn: "24h" } // Token expiration time
    );
    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await User.find();
    res.status(200).json({
      message: "Users retrieved successfully",
      users: allUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { createUser, singinUser, getAllUser };

const createOne = require("../../operations/user/createOne");
const bcrypt = require("bcryptjs");
const findOne = require("../../operations/user/findOne");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const usersUpdateOne = require("../../operations/user/updateOne");
const usersFindOne = require("../../operations/user/findOne");

const Secret_key = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);
  const { password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);
  req.body.password = bcryptPassword;
  req.body.confirmPassword = bcryptPassword;
  if (req.file) {
    req.body.profileImage = req.file.path;
  }

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
    const exisUser = await findOne({ email: email, isActive: true });
    if (!exisUser) {
      return res
        .status(401)
        .json({ message: "Invalid credentials or user not found" });
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
    // Use aggregation to get the count and the user documents in one operation
    const result = await User.aggregate([
      // Match documents where isActive is true
      { $match: { isActive: true } },
      // Group by null to calculate the total count and pass the documents
      {
        // $facet: {
          userCount: [{ $count: "count" }],
          users: [
            {
              $project: {
                password: 0, // Exclude the password field
                confirmPassword: 0, // Exclude the confirmPassword field
              },
            },
          ],
        // },
      },
    ]);
    console.log("result :>> ", result);
    // Extract the user count and users from the result
    const userCount = result[0].userCount[0]?.count || 0;
    const allUser = result[0].users;

    res.status(200).json({
      message: "Users retrieved successfully",
      users: allUser,
      userCount: userCount,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params; // Extract ID from URL
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    // Find and delete the user by ID
    const user = await usersFindOne({ _id: id, isActive: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await usersUpdateOne({ _id: id }, { $set: { isActive: false } });
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  console.log("req.body :>> ", req.body);
};

module.exports = { createUser, singinUser, getAllUser, deleteUser, updateUser };

const User = require("../../api/user/user.model");

const createOne = async (data) => {
  try {
    const newUser = new User(data); // Create a new instance of the User model
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};
module.exports = createOne;

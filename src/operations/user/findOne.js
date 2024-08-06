const User = require("../../api/user/user.model");

const usersFindOne = async (query) => {
  try {
    const existuser = await User.findOne(query);
    return existuser;
  } catch (error) {
    throw error;
  }
};

module.exports = usersFindOne;

const User = require("../../api/user/user.model");

const usersUpdateOne = async (filter, query) => {
  const res = await User.findOneAndUpdate(filter, query, { new: true });
  if (res) {
    return User.findOne(filter);
  }
  return res;
};

module.exports = usersUpdateOne;

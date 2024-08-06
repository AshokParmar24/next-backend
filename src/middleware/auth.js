const User = require("../api/user/user.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    console.log("req?.headers", req?.headers["authorization"].split(" "));
    const authToken = req?.headers["authorization"].split(" ");
    if (authToken[0] !== "Bearer") {
      return res.status(401).send("invalid token");
    } else {
      const tokenData = jwt.verify(authToken?.[1], process.env.JWT_SECRET);
      console.log("tokenData", tokenData);
      const user = await User.findOne({
        _id: tokenData?.user?.id,
      });
      console.log("useruseruser", user);
      if (!user || !user?._id) {
        return res.status(401).json("Unauthorized");
      }
      req.user = user;
      return next();
    }
  } catch (error) {
    return res.status(401).send("invalid token");
  }
};

module.exports = auth;

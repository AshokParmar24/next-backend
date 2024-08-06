const express = require("express");
const uerRoute = require("../api/user/user.route");

const router = express.Router();

router.use("/user", uerRoute);

module.exports = router;

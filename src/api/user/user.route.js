const express = require("express");
const { createUser, singinUser,getAllUser } = require("../user/user.controller");
const validation = require("../../middleware/validation");
const userValidation = require("../../validation/user/userValidation");

const auth =require("../../middleware/auth")

const router = express.Router();

router.route("/create").post(validation(userValidation), createUser);
router.route("/singin").post(validation(userValidation), singinUser);
router.route("/get-user").get(auth,getAllUser)

module.exports = router;

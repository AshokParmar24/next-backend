const express = require("express");
const {
  createUser,
  singinUser,
  getAllUser,
  deleteUser,
  updateUser,
} = require("../user/user.controller");
const validation = require("../../middleware/validation");
const userValidation = require("../../validation/user/userValidation");
const userSinginValidation = require("../../validation/user/singinValidation");
const upload = require("../../utils/multerConfig");

const auth = require("../../middleware/auth");

const router = express.Router();

router.route("/create").post(
  upload.single("profileImage"), // Apply Multer middleware here
  validation(userSinginValidation),
  createUser
);

router.route("/singin").post(validation(userValidation), singinUser);
router.route("/get-user").get(auth, getAllUser);
router.route("/delete/:id").delete(auth, deleteUser);
router.route("/update/:id").put(auth, updateUser);

module.exports = router;

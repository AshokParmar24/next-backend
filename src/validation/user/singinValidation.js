const { body } = require("express-validator");
const usersFindOne = require("../../operations/user/findOne");

const userSinginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email name is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .custom(async (value) => {
      const existuser = await usersFindOne({ email: value });
      if (existuser) {
        throw new Error("Email address already in use");
      }
      return true;
    }),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("mobileNumber")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .bail()
    .matches(/^[0-9]+$/)
    .withMessage("Mobile number must contain only digits"),
  // .bail()
  // .apply.isLength({ min: 10, max: 15 })
  // .withMessage("Mobile number must be between 10 and 15 characters"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character"
    ),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];
module.exports = userSinginValidation;

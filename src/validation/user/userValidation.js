const { body, matchedData } = require("express-validator");
 
const userValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email name is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail(),
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
];
module.exports = userValidation;

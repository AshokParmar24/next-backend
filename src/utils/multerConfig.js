// In multerConfig.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("In destination function");
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("In filename function", file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// const fileFilter = (req, file, cb) => {
//   console.log("In fileFilter function", file.mimetype);
//   const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Invalid file type"), false);
//   }
// };

const upload = multer({ storage });

module.exports = upload;

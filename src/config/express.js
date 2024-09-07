const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("../route/index");

const app = express();
app.set('view engine', 'ejs');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/next", router);

// app.use(cors());

module.exports = app;

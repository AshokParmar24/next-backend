const mongooseServer = require("./config/database");
const app = require("./config/express");
const env = require("dotenv");
const http = require("http");

env.config();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
console.log("process.env.PORT", process.env.PORT);

server.listen(port);

server.on("listening", () => {
  console.log(`Server is listening on PORT ${port}`);
});

server.on("error", (error) => {
  throw error;
});

// Connect to MongoDB
mongooseServer.connect();

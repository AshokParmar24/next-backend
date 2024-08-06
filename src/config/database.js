const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URL;
console.log("DATABASE_URL:", url);

const connect = async () => {
  if (!url) {
    throw new Error("MONGODB_URL environment variable is not defined");
  }
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("MongoDB disconnected!");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
};

module.exports = { connect, disconnect };

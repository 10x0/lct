const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.connectDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION_URI)
    .then(() => console.log("Database connected successfully."))
    .catch((error) => {
      if (error.message.startsWith("Invalid connection string")) {
        error.message = "Error: Invalid connection string.";
      }
      console.log(`Error while connecting to the database.\n${error.message}`);
      console.log("Shutting down the server.");
      process.exit(1);
    });
};

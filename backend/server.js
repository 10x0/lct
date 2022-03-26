const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const { connectDB } = require("./config/db");

dotenv.config();
const PORT = process.env.PORT || 5000;

process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("Shutting down due to uncaught exception.");
  process.exit(1);
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
});

// To connect to the DB
const mongoose = require("mongoose");

// To use the connection string stored as env variable
require("dotenv").config();

// Required by Mongo to ensure less errors
mongoose.set("strictQuery", false);

// Function to connect to DB
async function main() {
  await mongoose.connect(process.env.MONGODB_STRING);
}

// Log errors if any
main().catch((err) => {
  console.log(err);
});

// Log on successful connection
mongoose.connection.on("connected", () => {
  console.log("Database Connected");
});

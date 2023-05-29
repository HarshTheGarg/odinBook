const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

// console.log(process.env.MONGODB_STRING);
async function main() {
  await mongoose.connect(process.env.MONGODB_STRING);
}

main().catch((err) => {
  console.log(err);
});

mongoose.connection.on('connected', () => {
  console.log("Database Connected");
})

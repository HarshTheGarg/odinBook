// Require express and make app
const express = require("express");
const app = express();

// Passport to authenticate the users
const passport = require('passport');

// Passport Strategies
// use the passport jwt strategy
require("./config/passport/jwt");
require("./config/passport/google");
require("./config/passport/github");

// Connect to the DB
require("./config/mongoConnection");

// Code only to be run in development environment
if (process.env.NODE_ENV == "development") {
  // To use the .env variables
  require("dotenv").config();

  // Better console output
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Initialize the passport
app.use(passport.initialize());

// To process the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow cross-origin-resource-sharing
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

// All the routes handled by auth/index.js
app.use("/", require("./routes/index"));

// Handle page not found error
app.use((req, res) => {
  res.status(404);
  res.json({
    err: "Page not found",
  });
});

// if any function calls next(err) etc
app.use((err, req, res) => {
  console.log("Some Error: Error Handler Called");
  const status = err.statusCode || 500;
  const msg = err.message || "Something is wrong";
  res.status(status);
  res.json({
    success: false,
    status,
    msg
  })
})


// Set port to listen on using the env variables if available or else standard port
const port = process.env.PORT || 3000;

// Listen from the port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

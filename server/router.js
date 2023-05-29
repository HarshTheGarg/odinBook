const cors = require("cors");
const express = require("express");
require("dotenv").config();
const passport = require('passport');
require("./config/passport/jwt")(passport);

const app = express();

if (process.env.NODE_ENV == "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.use(passport.initialize());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

const index = require("./routes/index");
app.use("/", index);

app.use((req, res) => {
  res.status(404);
  res.json({
    err: "Page not found",
  });
});

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

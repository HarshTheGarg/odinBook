const express = require("express");
const app = express();
require("dotenv").config();

const morgan = require("morgan");
app.use(morgan("dev"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const index = require("./routes/index");
app.use("/", index);

app.get("/*", (req, res) => {
  res.status(404);
  res.json({
    msg: "Page not found",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

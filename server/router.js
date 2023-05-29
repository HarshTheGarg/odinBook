const express = require("express");
const app = express();
require("dotenv").config();

const morgan = require("morgan");
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require("./routes/index");
app.use("/", index);


app.use((req, res) => {
  res.status(404);
  res.json({
    err: "Page not found",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5000",
  })
);

if (process.env.NODE_ENV == "development") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}
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

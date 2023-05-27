const express = require('express');

const app = express.Router();

app.get("/", (req, res) => {
  res.json({msg: "Hello"});
})

module.exports = app;
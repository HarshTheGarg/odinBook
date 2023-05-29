// Require Express and create router
const express = require("express");
const router = express.Router();

// For local login, using username/password
router.use("/local", require("./local"));

module.exports = router;

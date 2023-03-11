const express = require("express");

const router = express.Router();

router.use("/auth", require("./v1/auth"));

module.exports = router;

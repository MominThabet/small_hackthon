const express = require("express");

const controller = require("../../../app/controller/Auth");

const router = express.Router();


router.post("/Signup",  controller.signUp);

router.post("/login",  controller.login);

module.exports = router;
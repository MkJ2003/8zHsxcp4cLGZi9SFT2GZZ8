"use strict";

var express = require("express");

var authController = require("../controllers/authController.js");

var router = express.Router();
router.post("/login", authController.login);
router.post('/signup', authController.signUp);
module.exports = router;
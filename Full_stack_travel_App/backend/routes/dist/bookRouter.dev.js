"use strict";

var express = require("express");

var fetchuser = require("../middlewares/fetchUser.js");

var bookController = require("../controllers/bookController.js");

var router = express.Router();
router.post("/booking", fetchuser, bookController.addBooking);
module.exports = router;
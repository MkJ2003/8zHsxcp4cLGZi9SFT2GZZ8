"use strict";

var express = require("express");

var subsController = require("../controllers/subsController.js");

var router = express.Router();
router.post("/addSubscription", subsController.addSubscriber);
module.exports = router;
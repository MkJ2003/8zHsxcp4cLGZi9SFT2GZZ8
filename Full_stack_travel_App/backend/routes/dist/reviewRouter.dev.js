"use strict";

var express = require("express");

var fetchuser = require("../middlewares/fetchUser.js");

var reviewController = require("../controllers/reviewController.js");

var router = express.Router();
router.post("/addreview", fetchuser, reviewController.addReview);
router.get("/reviews/:productid", reviewController.productReview);
module.exports = router;
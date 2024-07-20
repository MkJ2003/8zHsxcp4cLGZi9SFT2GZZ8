"use strict";

var express = require("express");

var fetchuser = require("../middlewares/fetchUser.js");

var placeController = require("../controllers/placeController.js");

var router = express.Router();
router.get("/allplaces", placeController.allPlaces);
router.get("/newPlaces", placeController.newPlaces);
router.get("/popularPlaces", placeController.popularPlaces);
router.post("/relatedplaces", placeController.relatedPlaces);
module.exports = router;
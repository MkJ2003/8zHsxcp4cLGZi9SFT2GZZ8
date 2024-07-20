const express = require("express");
const fetchuser = require("../middlewares/fetchUser.js");
const placeController = require("../controllers/placeController.js");


const router = express.Router();

router.get("/allplaces", placeController.allPlaces);


router.get("/newPlaces", placeController.newPlaces);

router.get("/popularPlaces", placeController.popularPlaces);

router.post("/relatedplaces", placeController.relatedPlaces);


module.exports = router;
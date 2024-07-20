const express = require("express");
const fetchuser = require("../middlewares/fetchUser.js");
const reviewController = require("../controllers/reviewController.js");
const router = express.Router();

router.post("/addreview", fetchuser,reviewController.addReview);
router.get("/reviews/:productid",reviewController.productReview);

module.exports = router;

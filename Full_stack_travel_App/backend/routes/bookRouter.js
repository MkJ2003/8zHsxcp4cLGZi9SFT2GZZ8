const express = require("express");
const fetchuser = require("../middlewares/fetchUser.js");
const bookController = require("../controllers/bookController.js")

const router = express.Router();

router.post("/booking", fetchuser, bookController.addBooking);

module.exports = router;  
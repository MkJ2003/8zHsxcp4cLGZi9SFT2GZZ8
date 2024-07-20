const express = require("express");
const subsController = require("../controllers/subsController.js");
const router = express.Router();

router.post("/addSubscription",subsController.addSubscriber);

module.exports = router;  
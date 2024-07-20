"use strict";

var mongoose = require("mongoose");

var subscriptionSchema = mongoose.Schema({
  ame: {
    type: String
  },
  email: {
    type: String,
    unique: true
  }
});
module.exports = mongoose.model("subscriptions", subscriptionSchema);
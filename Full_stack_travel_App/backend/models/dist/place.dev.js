"use strict";

var mongoose = require("mongoose");

var placeSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    "default": Date.now
  },
  avilable: {
    type: Boolean,
    "default": true
  },
  details: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model("Places", placeSchema);
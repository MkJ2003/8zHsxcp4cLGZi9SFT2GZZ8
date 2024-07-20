const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
    name: {
    type: String,
    required: true

  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cartData: {
    type: Object
  },
  date: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Users",userSchema);
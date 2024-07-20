const mongoose =require("mongoose");

const reviewSchema = mongoose.Schema({
    name: {
        type: String
      },
      message: {
        type: String,
    
      },
      product_id: {
        type: Number,
      }
});

module.exports = mongoose.model("reviews",reviewSchema);
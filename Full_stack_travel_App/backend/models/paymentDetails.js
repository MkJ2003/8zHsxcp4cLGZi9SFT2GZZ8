const mongoose =require("mongoose");

const paymentSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
      visitor: {
        type: Number,
        required: true,
      },
      total_payment: {
        type: Number,
        required: true,
      },
      payment_status: {
        type: String,
        required: true,
      }
    
});

module.exports = mongoose.model("paymentDetails",paymentSchema);
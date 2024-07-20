const mongoose =require("mongoose");

const bookingSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      destination: {
        type: String,
        required: true,
      },
      dep_date: {
        type: String,
        required: true,
      },
      ret_date: {
        type: String,
        required: true,
      },
      people: {
        type: Number,
        required: true,
      },
      product_id: {
        type: Number,
        required: true,
      }
});

module.exports = mongoose.model("bookings",bookingSchema);
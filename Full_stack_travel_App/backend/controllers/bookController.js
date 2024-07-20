const bookings = require("../models/booking.js");


class bookController{
    static addBooking = async (req, res) => {

        const {
          name,
          email,
          destination,
          departureDate,
          returnDate,
          people,
          productid
        } = req.body;
      
        if (name && email && destination && departureDate && returnDate && people && productid) {
          try {
      
      
      
            const booking = new bookings({
              id: req.user.id,
              name: name,
              email: email,
              destination: destination,
              dep_date: departureDate,
              ret_date: returnDate,
              people: Number(people),
              product_id: productid
      
            });
      
      
            const savedBooking = await booking.save();
      
            return res.status(200).json({
              message: "Booking details has been added"
            })
      
      
      
          } catch (err) {
            return res.status(400).json({
              message: "Fill the correct values."
            });
          }
        } else {
          return res.status(400).json({
            message: "Fill all the required fields"
          });
        }
      
      
      
      };
}

module.exports = bookController;
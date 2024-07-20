const reviews = require("../models/reviews.js");

class reviewController{
    static addReview = async (req, res) => {

        try {
      
      
          if (!req.body.message) {
            return res.status(400).json({
              errors: "Message is required"
            });
          }
          const review = new reviews({
            name: req.user.name,
            message: req.body.message,
            product_id: req.body.pid
          });
      
          const savedReview = await review.save();
      
          return res.status(200).json({
            message: "Your review has been added"
          });
        } catch (err) {
          return res.status(500).json({
            errors: err
          });
        }
      };

      static productReview = async (req, res) => {
        try {
          const productId = req.params.productid;
          
      
      
      
          // Fetch reviews for the given product
          const review = await reviews.find({
            product_id: productId
          });
          review.reverse();
          res.json(review);
        } catch (err) {
          console.error("Error fetching reviews:", err);
          res.status(500).json({
            error: "Internal server error"
          });
        }
      };
};

module.exports = reviewController;

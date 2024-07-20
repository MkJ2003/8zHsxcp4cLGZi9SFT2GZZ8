
const subscriptions = require("../models/subscription.js");

class subsController {
    static addSubscriber = async (req, res) => {
        try {
      
      
          if (!req.body.email) {
            return res.status(400).json({
              errors: "Email is required"
            });
          }
      
          let existingSubscriber = await subscriptions.findOne({
            email: req.body.email
          });
          if (existingSubscriber) {
            return res.status(400).json({
              errors: "You have already subscribed."
            });
          }
      
          const subscriber = new subscriptions({
            email: req.body.email,
          });
      
      
      
          const savedSubscriber = await subscriber.save();
      
          return res.status(200).json({
            message: "User has been added"
          });
        } catch (error) {
          console.error("Error adding subscription:", error);
          if (error.name === 'ValidationError') {
            return res.status(400).json({
              errors: error.message
            });
          }
          return res.status(500).json({
            errors: "Internal server error"
          });
        }
      };
};

module.exports = subsController;

const Users = require("../models/user.js");
const jwt = require("jsonwebtoken");
require('dotenv').config();

class authController{
     static signUp = async (req, res) => {

        if (req.body.email && req.body.username && req.body.password) {
      
          let success = false;
          let check = await Users.findOne({
            email: req.body.email
          });
          if (check) {
            return res.status(400).json({
              success: success,
              errors: "existing user found with this email"
            });
          }
          let cart = {};
          for (let i = 0; i < 3000; i++) {
            cart[i] = 0;
          }
          const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            cartData: cart,
          });
          await user.save();
          const data = {
            user: {
              id: user.id,
              name: user.name,
            }
          }
      
          const token = jwt.sign(data, process.env.JWT_SECRET);
          success = true;
          res.json({
            success,
            token
          })
        } else {
          res.json({
            errors: "Fill all the required field for signup"
          });
        }
      };

    static login =  async (req, res) => {

        if (req.body.email && req.body.password) {
            let success = false;
            let user = await Users.findOne({
                email: req.body.email
            });
            if (user) {
                const passCompare = req.body.password === user.password;
                if (passCompare) {
                    const data = {
                        user: {
                            id: user.id,
                            name: user.name,
                        }
                    }
                    success = true;
    
                    const token = jwt.sign(data, process.env.JWT_SECRET);
    
                    res.json({
                        success,
                        token
                    });
                } else {
                    return res.status(400).json({
                        success: success,
                        errors: "please try with correct email/password"
                    })
                }
            } else {
                return res.status(400).json({
                    success: success,
                    errors: "please try with correct email/password"
                })
            }
        } else {
            return res.status(400).json({
                errors: "Fill all the required fields"
            })
        }
    };  
}

module.exports = authController;
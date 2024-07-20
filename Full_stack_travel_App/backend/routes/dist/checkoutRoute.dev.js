"use strict";

var express = require("express");

var stripe = require("stripe")("sk_test_51Pd8fVAjlUUztHiYZqMAxWwJHzJyz543s7BhJL3V2cJ6QZ1KYsnhMhUn9ZWnwmPw5uxa5zRmDewLLwWwGUSrURW100TFhoOLRI");

var endpointSecret = "whsec_b713fd9535f08db911116160a97e85f1366cf716a4ccd1845b7516f5ae341f42";

var fetchuser = require("");

var router = express.Router();
app.post('/api/create-checkout-session', fetchuser, function _callee(req, res) {
  var id, product, detail, customer, session;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Your logic here
          id = req.user.id;
          product = req.body.product;
          detail = req.body.detail;
          _context.next = 5;
          return regeneratorRuntime.awrap(stripe.customers.create({
            metadata: {
              user_id: id,
              visitor: detail.people,
              product_name: product.name,
              total_price: Number(product.new_price) * Number(detail.people)
            }
          }));

        case 5:
          customer = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [{
              price_data: {
                currency: "inr",
                product_data: {
                  name: product.name,
                  metadata: {
                    visitors: detail.people,
                    user_id: req.user.id
                  }
                },
                unit_amount: product.new_price * detail.people * 100
              },
              quantity: 1
            }],
            customer: customer.id,
            mode: "payment",
            success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cancel"
          }));

        case 8:
          session = _context.sent;
          res.json({
            id: session.id
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;
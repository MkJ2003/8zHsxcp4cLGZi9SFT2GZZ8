"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var multer = require("multer");

var path = require("path");

var cors = require("cors");

var port = process.env.PORT || 4000;

require('dotenv').config();

var authRouter = require("./routes/authRouter.js");

var subsRouter = require("./routes/subsRouter.js");

var fetchuser = require("./middlewares/fetchUser.js");

var reviewRouter = require("./routes/reviewRouter.js");

var placeRouter = require("./routes/placeRouter.js");

var bookRouter = require("./routes/bookRouter.js");

var paymentDetails = require("./models/paymentDetails.js");

var stripe = require("stripe")(process.env.STRIPE_KEY);

var endpointSecret = process.env.END_SECRET;
var mongoURI = process.env.MONGODB_URI;
app.use(cors());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (err) {
  return console.error('MongoDB connection error:', err);
});
app.post('/webhook', express.raw({
  type: 'application/json'
}), function _callee(req, res) {
  var sig, event, data, eventType, customer, newPayment, savedPayment;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sig = req.headers[process.env.SIGNATURE];
          _context.prev = 1;
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
          console.log("webhook verified");
          _context.next = 11;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](1);
          console.log("Webhook Error: ".concat(_context.t0.message));
          response.status(400).send("Webhook Error: ".concat(_context.t0.message));
          return _context.abrupt("return");

        case 11:
          eventType = event.type;
          data = event.data.object;

          if (!(eventType === "checkout.session.completed")) {
            _context.next = 27;
            break;
          }

          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(stripe.customers.retrieve(data.customer));

        case 17:
          customer = _context.sent;
          newPayment = new paymentDetails({
            user_id: customer.metadata.user_id,
            place: customer.metadata.product_name,
            visitor: customer.metadata.visitor,
            total_payment: customer.metadata.total_price,
            payment_status: data.payment_status
          });
          _context.next = 21;
          return regeneratorRuntime.awrap(newPayment.save());

        case 21:
          savedPayment = _context.sent;
          _context.next = 27;
          break;

        case 24:
          _context.prev = 24;
          _context.t1 = _context["catch"](14);
          console.log("Error retrieving customer:", _context.t1.message);

        case 27:
          res.send().end();

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 6], [14, 24]]);
});
app.use(express.json()); //Image Storage Engine 

var storage = multer.diskStorage({
  destination: './upload/images',
  filename: function filename(req, file, cb) {
    return cb(null, "".concat(file.fieldname, "_").concat(Date.now()).concat(path.extname(file.originalname)));
  }
});
var upload = multer({
  storage: storage
});
app.post("/upload", upload.single('product'), function (req, res) {
  res.json({
    success: 1,
    image_url: "/images/".concat(req.file.filename)
  });
});
app.use('/images', express["static"]('upload/images'));
app.use("/api/auth", authRouter);
app.use("/api/subs", subsRouter);
app.use("/api/review", reviewRouter);
app.use("/api/place", placeRouter);
app.use("/api/travel", bookRouter);
app.get("/", function (req, res) {
  res.send("Root");
});
app.post('/api/create-checkout-session', fetchuser, function _callee2(req, res) {
  var id, product, detail, customer, session;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Your logic here
          id = req.user.id;
          product = req.body.product;
          detail = req.body.detail;
          _context2.next = 5;
          return regeneratorRuntime.awrap(stripe.customers.create({
            metadata: {
              user_id: id,
              visitor: detail.people,
              product_name: product.name,
              total_price: Number(product.new_price) * Number(detail.people)
            }
          }));

        case 5:
          customer = _context2.sent;
          _context2.next = 8;
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
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
          }));

        case 8:
          session = _context2.sent;
          res.json({
            id: session.id
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.post('/getPaymentDetails', fetchuser, function _callee3(req, res) {
  var paymentDetail;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(paymentDetails.find({
            user_id: req.user.id
          }));

        case 2:
          paymentDetail = _context3.sent;
          res.json(paymentDetail);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.listen(port, function (error) {
  if (!error) console.log("Server Running on port " + port);else console.log("Error : ", error);
});
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 4000;
require('dotenv').config();
const authRouter = require("./routes/authRouter.js");
const subsRouter = require("./routes/subsRouter.js");
const fetchuser = require("./middlewares/fetchUser.js");
const reviewRouter = require("./routes/reviewRouter.js");
const placeRouter = require("./routes/placeRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const paymentDetails = require("./models/paymentDetails.js");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const endpointSecret = process.env.END_SECRET;
const mongoURI = process.env.MONGODB_URI;

app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.post('/webhook', express.raw({
  type: 'application/json'
}), async (req, res) => {
  const sig = req.headers[process.env.SIGNATURE];

  let event;
  let data;
  let eventType;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    console.log("webhook verified");



  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  eventType = event.type;
  data = event.data.object;

  if (eventType === "checkout.session.completed") {
    try {
      const customer = await stripe.customers.retrieve(data.customer)
      const newPayment = new paymentDetails({

        user_id: customer.metadata.user_id,
        place: customer.metadata.product_name,
        visitor: customer.metadata.visitor,
        total_payment: customer.metadata.total_price,
        payment_status: data.payment_status,


      })
      const savedPayment = await newPayment.save();

    } catch (err) {
      console.log("Error retrieving customer:", err.message);
    }
  }

  res.send().end();
});

app.use(express.json());

//Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({
  storage: storage
})
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`
  })
})


app.use('/images', express.static('upload/images'));
app.use("/api/auth", authRouter);
app.use("/api/subs", subsRouter);
app.use("/api/review", reviewRouter);
app.use("/api/place", placeRouter);
app.use("/api/travel", bookRouter);


app.get("/", (req, res) => {
  res.send("Root");
});

app.post('/api/create-checkout-session', fetchuser, async (req, res) => {
  // Your logic here
  
  const id = req.user.id;
  const product = req.body.product;
  const detail = req.body.detail;
  const customer = await stripe.customers.create({
    metadata: {
      user_id: id,
      visitor: detail.people,
      product_name: product.name,
      total_price: Number(product.new_price) * Number(detail.people),
    }
  });
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "inr",
        product_data: {
          name: product.name,
          metadata: {
            visitors: detail.people,
            user_id: req.user.id,
          },
        },
        unit_amount: (product.new_price * detail.people) * 100,
      },
      quantity: 1
    }],
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/success',
    cancel_url: `${process.env.FRONTEND_URL}/cancel`,

  })
  res.json({
    id: session.id
  })
});


app.post('/getPaymentDetails', fetchuser, async (req, res) => {
  let paymentDetail = await paymentDetails.find({
    user_id: req.user.id,
  })
  res.json(paymentDetail);
})


app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});

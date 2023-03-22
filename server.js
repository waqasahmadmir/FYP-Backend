const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const stripe = require("stripe")(
  "sk_test_51Mj0N1EczbAuP7U0dt8z41QxOK8j5Y0tJ9gLqpT4MRcJle4BOptRVNaDz4BrsQdRNld7JrLQFQdzwlBkSKTmdUBn00wgFxivan"
);

require("./connection");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "http://localhost:3001",
  methods: ["GET", "POST", "PATCH", "DELETE"],
});

const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

// const chatRoutes=require('./routes/chatRoutes')

app.use(cors());
// app.use(express.bodyParser({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// app.use("/chat", chatRoutes);

app.post("/create-payment", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    res.status(200).json(paymentIntent);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
  }
});

//this is also working
// app.post("/create-payment", async (req, res) => {
//   try {
//     const { amount, shipping } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       shipping,
//       amount: 200,
//       currency: "usd",
//     });

//     res.status(200).send(paymentIntent.client_secret);
//   } catch (err) {
//     res.status(500).json({
//       statusCode: 500,
//       message: err.message,
//     });
//   }
// });

// app.post("/create-payment", async (req, res) => {
//   const { amount } = req.body;
//   console.log(amount);
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//     });
//     res.status(200).json(paymentIntent);
//   } catch (e) {
//     console.log("yh error??" + e.message);
//     res.status(400).json(e.message);
//   }
// });

server.listen(8084, () => {
  console.log("server running at port", 8084);
});

app.set("socketio", io);

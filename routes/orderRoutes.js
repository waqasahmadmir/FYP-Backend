const router = require("express").Router();
const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
//creating an order

router.post("/", async (req, res) => {
  const io = req.app.get("socketio");
  const { userId, cart, buyershippingaddress, productcategory } = req.body;

  console.log("category" + productcategory);

  try {
    const user = await User.findById(userId);
    const prod = await Product.findById(cart.productid);
    console.log(
      "this category " + prod.productcategory + "name " + prod.productname
    );

    // Create the order
    const order = await Order.create({
      owner: user._id,
      products: cart,
      buyershippingaddress,
    });
    order.productcategory = prod.productcategory;
    order.productquantity = cart.count;
    order.amount = cart.total;
    order.creator = cart.creator;
    order.productname = cart.productname;
    order.productid = cart.productid;
    order.buyeremail = user.email;
    order.buyername = user.name;
    await order.save();

    // Update the product quantity
    const product = await Product.findById(cart.productid);

    product.productquantity -= cart.count;
    console.log("it decreased by " + cart.count);
    await product.save();

    // Clear user's cart and update orders
    user.cart = { total: 0, count: 0 };
    user.orders.push(order);
    const notification = {
      status: "unread",
      message: `New order from ${user.name}`,
      time: new Date(),
    };
    io.sockets.emit("new-order", notification);
    user.markModified("orders");
    await user.save();

    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

// getting all orders;
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("owner", ["email", "name"]);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;

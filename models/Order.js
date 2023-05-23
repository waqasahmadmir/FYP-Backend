// const mongoose = require("mongoose");
// const OrderSchema = mongoose.Schema(
//   {
//     products: {
//       type: Object,
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     status: {
//       type: String,
//       default: "processing",
//     },
//     total: {
//       type: Number,
//       default: 0,
//     },
//     count: {
//       type: Number,
//       default: 0,
//     },
//     date: {
//       type: String,
//       default: new Date().toISOString().split("T")[0],
//     },
//     address: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//   },
//   { minimize: false }
// );

// const Order = mongoose.model("Order", OrderSchema);

// module.exports = Order;

const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  buyername: {
    type: String,
    default: "",
  },
  buyeremail: { type: String, default: "" },
  buyershippingaddress: { type: String, default: "" },
  buyerpurchasedata: {
    type: String,
    default: new Date().toISOString().split("T")[0],
  },
  productid: { type: String, default: "" },
  productname: { type: String, default: "" },
  productprice: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  productquantity: { type: Number, default: 0 },
  productcategory: { type: String, default: "" },
  productdescription: { type: String, default: "" },
  creator: { type: String, default: "" },
  shippingmethod: { type: String, default: "" },
  status: { type: String, default: "pending" },
  shippingservice: { type: String, default: "" },
  trackingid: { type: String, default: "" },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

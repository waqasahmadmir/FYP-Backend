const mongoose = require("mongoose");
const productdetailsSchema = mongoose.Schema({
  productname: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100,
  },
  productprice: {
    type: Number,
    required: true,
  },

  productquantity: {
    type: Number,
    required: true,
  },
  productcategory: {
    type: String,
    required: true,
  },

  productdescription: {
    type: String,
    required: true,
  },

  creator: {
    type: String,
  },

  image: {
    type: Array,
    required: true,
  },
  shippingmethod: {
    type: String,
    require: true,
  },
  sales: {
    type: Number,
  },
  views: {
    type: Number,
  },
  status: {
    type: String,
  },
  shippingservice: {
    type: String,
    required: true,
  },
  trackingid: {
    type: String,
    required: true,
  },
});

const ProductDetail = mongoose.model("ProductDetail", productdetailsSchema);
module.exports = ProductDetail;

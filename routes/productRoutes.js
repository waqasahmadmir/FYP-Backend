const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");

//get products;
router.get("/", async (req, res) => {
  try {
    const sort = { _id: -1 };
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    const similar = await Product.find({
      category: product.productcategory,
    }).limit(5);
    res.status(200).json({ product, similar });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    let products;
    const sort = { _id: -1 };
    if (category == "all") {
      products = await Product.find().sort(sort);
    } else {
      products = await Product.find({ category }).sort(sort);
    }
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/add-to-cart", async (req, res) => {
  const { userId, productId, productprice, productid, productname, creator } =
    req.body;

  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    if (user.cart[productId]) {
      userCart[productId] += 1;
    } else {
      userCart[productId] = 1;
    }
    userCart.count += 1;
    userCart.total = Number(userCart.total) + Number(productprice);
    (userCart.creator = creator),
      (userCart.productname = productname),
      (userCart.productid = productid),
      (user.cart = userCart);

    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/increase-cart", async (req, res) => {
  const { userId, productId, productprice } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;

    const product = await Product.findById(productId);
    if (userCart[productId] + 1 > product.productquantity) {
      console.log("2");
      return res
        .status(400)
        .send({ message: "Product quantity exceeds available stock" });
    }

    userCart.total += Number(productprice);
    userCart.count += 1;
    userCart[productId] += 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// router.post("/increase-cart", async (req, res) => {
//   const { userId, productId, productprice } = req.body;
//   try {
//     const user = await User.findById(userId);
//     const userCart = user.cart;

//     console.log("1");
//     // Check if the product quantity exceeds the maximum available quantity
//     const product = await Product.findById(productId);
//     if (userCart[productId] + 1 > product.productquantity) {
//       console.log("2");
//       return res
//         .status(400)
//         .send({ message: "Product quantity exceeds available stock" });
//     }

//     console.log("yha");
//     productprice = Number(productprice);
//     userCart.total += Number(productprice);
//     userCart.count += 1;
//     userCart[productId] += 1;
//     console.log("4");
//     user.cart = userCart;
//     console.log("5");
//     user.markModified("cart");
//     await user.save();
//     res.status(200).json(user);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });

router.post("/decrease-cart", async (req, res) => {
  const { userId, productId, productprice } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(productprice);
    userCart.count -= 1;
    userCart[productId] -= 1;
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/remove-from-cart", async (req, res) => {
  const { userId, productId, productprice } = req.body;
  try {
    const user = await User.findById(userId);
    const userCart = user.cart;
    userCart.total -= Number(userCart[productId]) * Number(productprice);
    userCart.count -= userCart[productId];
    delete userCart[productId];
    user.cart = userCart;
    user.markModified("cart");
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/products", async (req, res) => {
  console.log("idr to a rha ha");
  const { ids } = req.body;

  try {
    // Send request to retrieve products based on the provided IDs
    const response = await axios.get("/", {
      params: {
        ids: ids,
      },
    });

    const products = response.data;

    res.json({ products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

module.exports = router;

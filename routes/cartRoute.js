const {
  verifyToken,
  verifyTokendAndAuthorization,
  verifyTokendAndAdmin,
} = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

router.post("/register", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedProduct = await newCart.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.send(500).json(err);
  }
});

router.put("/:id", verifyTokendAndAdmin, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokendAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId",verifyTokendAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", verifyTokendAndAdmin,async (req, res) => {

    try {
        const carts=await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


module.exports = router;

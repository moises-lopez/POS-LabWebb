const express = require("express");
const router = express.Router();
const Product = require("../models/products.model");

const idFilter = (req) => (list) => list._id === parseInt(req.params.id);

// Routes
router.get("/", (req, res) => {
  Product.find({})
    .then((data) => {
      console.log("Product: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: Something broke");
    });
});

router.post("/save", (req, res) => {
  const data = req.body;
  console.log(data);

  const newProduct = new Product(data);

  newProduct.save((error) => {
    if (error) {
      res.status(500).json({ msg: "There is a leaking pipe :(" });
      console.log(error);
      return;
    }
    // BlogPost
    return res.json({
      msg: "Your data has been saved!!!",
    });
  });
});

router.get("/:id", (req, res) => {
  Product.find({ _id: req.params.id })
    .then((data) => {
      console.log("Product: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: Something broke");
    });
});

router.post("/update/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((el) => {
      el._id = req.body._id;
      el.name = req.body.name;
      el.category = req.body.category;
      el.unitPrice = req.body.unitPrice;
      el.quantity = req.body.quantity;
      el.save()
        .then(() => res.json("The update was made"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/delete/:id", (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

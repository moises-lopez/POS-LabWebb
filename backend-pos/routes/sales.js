const express = require("express");
const router = express.Router();
const Sale = require("../models/sales.model");

const idFilter = (req) => (list) => list._id === parseInt(req.params.id);

// Routes
router.get("/", (req, res) => {
  Sale.find({})
    .then((data) => {
      console.log("Sale: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: Something broke");
    });
});

router.post("/save", (req, res) => {
  const data = req.body;

  const newSale = new Sale(data);
  console.log("data ", data);

  newSale.save((error) => {
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
  Sale.find({ id: req.params.id })
    .then((data) => {
      console.log("Sale: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: Something broke");
    });
});

module.exports = router;

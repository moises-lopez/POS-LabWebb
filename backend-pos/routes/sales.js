const express = require("express");
const router = express.Router();
const moment = require("moment");
moment().format();

const Sale = require("../models/sales.model");

const idFilter = (req) => (list) => list._id === parseInt(req.params.id);

// Routes
router.get("/", async (req, res) => {
  let sales = await Sale.find({});
  sales = sales.map((sale) => {
    const newDate = moment(sale.createdAt);
    console.log(newDate);
    return {
      arrayProducts: sale.arrayProducts,
      total: sale.total,
      createdAt: newDate.toDate().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  });
  console.log(sales);
  res.json(sales);
});
const getVentasSemanal = async (week) => {
  let start = moment().subtract(week, "week").startOf("day");
  let end = moment().subtract(week, "week").endOf("day");
  const ventasSemanal = [];
  for (let index = 0; index < 7; index++) {
    console.log(start);
    const ventaDia = await aggregateVentasHoy(start.toDate(), end.toDate());
    ventasSemanal.push({
      fecha: start.toDate().toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      ventas: ventaDia.toFixed(2),
    });
    start = start.subtract(1, "day");
    end = end.subtract(1, "day");
  }
  return ventasSemanal.reverse();
};

const aggregateVentasHoy = async (start, end) => {
  const agg = await Sale.aggregate([
    { $match: { createdAt: { $gte: start, $lte: end } } },
    {
      $group: {
        _id: null,
        "Total sales": {
          $sum: "$total",
        },
      },
    },
  ]);
  if (agg.length > 0) {
    return agg[0]["Total sales"];
  } else {
    return 0;
  }
};

router.get("/salesWeekly", async (req, res) => {
  res.json(await getVentasSemanal(req.query.currentWeek));

  // Sale.find({})
  //   .then((data) => {
  //     console.log("Sale: ", data);
  //     res.json(data);
  //   })
  //   .catch((error) => {
  //     console.log("error: Something broke");
  //   });
});

router.get("/salesToday", async (req, res) => {
  console.log("HLO");
  let start = moment().startOf("day");
  let end = moment().endOf("day");
  res.json(await aggregateVentasHoy(start.toDate(), end.toDate()));

  // Sale.find({})
  //   .then((data) => {
  //     console.log("Sale: ", data);
  //     res.json(data);
  //   })
  //   .catch((error) => {
  //     console.log("error: Something broke");
  //   });
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

const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const SalesSchema = new Schema(
  {
    total: { type: Number, required: true },
    arrayProducts: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", SalesSchema);

module.exports = Sales;

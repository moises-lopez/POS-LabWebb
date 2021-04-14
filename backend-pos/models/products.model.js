const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProductsSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: String, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;

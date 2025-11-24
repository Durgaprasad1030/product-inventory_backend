const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    unit: { type: String, required: true }, // e.g., kg, pcs
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },
    image: { type: String }, // Optional URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
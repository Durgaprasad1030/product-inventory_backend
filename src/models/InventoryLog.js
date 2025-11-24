const mongoose = require("mongoose");

const inventoryLogSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    actionType: { type: String, enum: ["CREATE", "UPDATE", "IMPORT"], required: true },
    oldStock: { type: Number },
    newStock: { type: Number },
    description: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("InventoryLog", inventoryLogSchema);
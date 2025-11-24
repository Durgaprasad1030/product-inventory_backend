const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  searchProducts,
  updateProduct,
  deleteProduct,
  exportProducts,
  getProductHistory,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/search", searchProducts);
router.get("/export", exportProducts);
router.get("/:id/history", getProductHistory);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
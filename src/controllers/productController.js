const Product = require("../models/Product");
const InventoryLog = require("../models/InventoryLog");
const { Parser } = require("json2csv");

// 1. Create a Single Product
exports.createProduct = async (req, res) => {
  try {
    const { name, brand, category, unit, stock } = req.body;
    
    // Check if name already exists
    const existing = await Product.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (existing) return res.status(400).json({ message: "Product name already exists" });

    const status = parseInt(stock) > 0 ? "In Stock" : "Out of Stock";
    
    const newProduct = new Product({
      name,
      brand,
      category,
      unit,
      stock,
      status
    });

    const savedProduct = await newProduct.save();

    await InventoryLog.create({
      productId: savedProduct._id,
      actionType: "CREATE",
      oldStock: 0,
      newStock: savedProduct.stock,
      description: "Manually created"
    });

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Search Products
exports.searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await Product.find({ 
      name: { $regex: name, $options: "i" } 
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, ...updates } = req.body;
    
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const oldStock = product.stock;
    const newStock = parseInt(stock);

    Object.assign(product, updates);
    product.stock = newStock;
    product.status = newStock > 0 ? "In Stock" : "Out of Stock";

    await product.save();

    if (oldStock !== newStock) {
      await InventoryLog.create({
        productId: product._id,
        actionType: "UPDATE",
        oldStock,
        newStock,
        description: `Stock updated manually from ${oldStock} to ${newStock}`,
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5. Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await InventoryLog.deleteMany({ productId: id });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 6. Get History
exports.getProductHistory = async (req, res) => {
  try {
    const logs = await InventoryLog.find({ productId: req.params.id }).sort({ timestamp: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 7. Export CSV (Kept this as you only asked to remove Import)
exports.exportProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    const fields = ["_id", "name", "brand", "category", "stock", "unit", "status"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(products);

    res.header("Content-Type", "text/csv");
    res.attachment("products.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
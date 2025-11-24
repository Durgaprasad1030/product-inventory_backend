require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product");
const InventoryLog = require("./src/models/InventoryLog");
const connectDB = require("./src/config/db");

const sampleProducts = [
  {
    name: "Amul Milk",
    brand: "Amul",
    category: "Dairy",
    unit: "1 Liter",
    stock: 50,
    status: "In Stock",
  },
  {
    name: "Britannia Bread",
    brand: "Britannia",
    category: "Bakery",
    unit: "1 Packet",
    stock: 30,
    status: "In Stock",
  },
  {
    name: "Tata Salt",
    brand: "Tata",
    category: "Groceries",
    unit: "1 kg",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Maggi Noodles",
    brand: "Nestle",
    category: "Snacks",
    unit: "1 Packet",
    stock: 100,
    status: "In Stock",
  },
  {
    name: "Coca Cola",
    brand: "Coca Cola",
    category: "Beverages",
    unit: "500ml",
    stock: 25,
    status: "In Stock",
  },
  {
    name: "Dettol Soap",
    brand: "Dettol",
    category: "Hygiene",
    unit: "1 Bar",
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Aashirvaad Atta",
    brand: "ITC",
    category: "Groceries",
    unit: "5 kg",
    stock: 15,
    status: "In Stock",
  },
];

const seedDB = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Clear existing data (Optional: removes old data to avoid duplicates)
    await Product.deleteMany({});
    await InventoryLog.deleteMany({});
    console.log("🗑️  Old data removed...");

    // 3. Insert new data
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample data imported successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error with data import:", error);
    process.exit(1);
  }
};

seedDB();
Product Inventory System - Backend API

This is the backend server for the Product Inventory Management System. It is a RESTful API built with Node.js, Express, and MongoDB.

🚀 Tech Stack

Node.js & Express: Server framework.

MongoDB & Mongoose: Database and ODM.

json2csv: Used to generate CSV exports.

Nodemon: For development auto-reloading.

⚙️ Setup & Installation

Navigate to the backend folder:

cd backend


Install Dependencies:

npm install


Configure Environment:
Create a .env file in the backend root:

PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory_db
# Or your MongoDB Atlas Connection String


Run the Server:

npm run dev


Server will start on http://localhost:5000.

Seed Database (Optional):
To populate the DB with dummy data:

npm run seed


🔌 API Endpoints

Method

Endpoint

Description

GET

/api/products

Get all products

POST

/api/products

Create a new product

GET

/api/products/search?name=x

Search product by name

PUT

/api/products/:id

Update product & stock

DELETE

/api/products/:id

Delete a product

GET

/api/products/:id/history

Get stock change logs

GET

/api/products/export

Download CSV file

📦 Database Models

Product: Stores details like name, brand, category, unit, stock, and status.

InventoryLog: Stores history of stock changes (oldStock vs newStock) and timestamps.
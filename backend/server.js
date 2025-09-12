const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dataPath = path.join(__dirname, "data.json");

// Helper functions to read/write JSON
const readData = () => {
  const jsonData = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all products
app.get("/products", (req, res) => {
  const data = readData();
  res.json(data.products);
});

// Add new product
app.post("/products", (req, res) => {
  const data = readData();
  const newProduct = { id: Date.now(), ...req.body };
  data.products.push(newProduct);
  writeData(data);
  res.json(newProduct);
});

// Update product
app.put("/products/:id", (req, res) => {
  const data = readData();
  const index = data.products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    data.products[index] = { id: data.products[index].id, ...req.body };
    writeData(data);
    res.json(data.products[index]);
  } else {
    res.status(404).send("Product not found");
  }
});

// Delete product
app.delete("/products/:id", (req, res) => {
  const data = readData();
  data.products = data.products.filter(p => p.id != req.params.id);
  writeData(data);
  res.sendStatus(200);
});

// Record a sale
app.post("/sales", (req, res) => {
  const { productId, quantity } = req.body;
  const data = readData();

  const product = data.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  if (product.quantity < quantity) return res.status(400).json({ error: "Not enough stock" });

  // Deduct stock
  product.quantity -= quantity;

  // Record sale
  const sale = {
    id: Date.now(),
    productId,
    quantity,
    date: new Date().toISOString()
  };
  data.sales.push(sale);

  writeData(data);
  res.json(sale);
});

// Get all customers
app.get("/customers", (req, res) => {
  const data = readData();
  res.json(data.customers);
});

// Add a new customer
app.post("/customers", (req, res) => {
  const data = readData();
  const customer = { id: Date.now(), ...req.body };
  data.customers.push(customer);
  writeData(data);
  res.json(customer);
});

// Get stock report
app.get("/reports/stock", (req, res) => {
  const data = readData();
  const lowStock = data.products.filter(p => p.quantity < 5); // example threshold
  res.json({ products: data.products, lowStock });
});

// Get sales report
app.get("/reports/sales", (req, res) => {
  const data = readData();
  res.json(data.sales);
});

// --- SALES MODULE ---
// Record a sale
app.post("/sales", (req, res) => {
  const { productId, quantity } = req.body;
  const data = readData();

  const product = data.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });
  if (product.quantity < quantity) return res.status(400).json({ error: "Not enough stock" });

  // Deduct stock
  product.quantity -= quantity;

  // Record sale
  const sale = {
    id: Date.now(),
    productId,
    quantity,
    date: new Date().toISOString()
  };
  data.sales.push(sale);

  writeData(data);
  res.json(sale);
});

// Get all sales
app.get("/sales", (req, res) => {
  const data = readData();
  res.json(data.sales);
});


// --- CUSTOMERS MODULE ---
// Get all customers
app.get("/customers", (req, res) => {
  const data = readData();
  res.json(data.customers);
});

// Add a new customer
app.post("/customers", (req, res) => {
  const data = readData();
  const customer = { id: Date.now(), ...req.body };
  data.customers.push(customer);
  writeData(data);
  res.json(customer);
});


// --- REPORTS MODULE ---
// Stock report (all products + low stock alert)
app.get("/reports/stock", (req, res) => {
  const data = readData();
  const lowStock = data.products.filter(p => p.quantity < 5); // threshold example
  res.json({ products: data.products, lowStock });
});

// Sales report
app.get("/reports/sales", (req, res) => {
  const data = readData();
  res.json(data.sales);
});



app.listen(5000, () => console.log("Server running on http://localhost:5000"));

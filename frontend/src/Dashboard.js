import React, { useState, useEffect } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(setProducts)
      .catch(() => setProducts([]));

    fetch("http://localhost:5000/sales")
      .then(res => res.json())
      .then(setSales)
      .catch(() => setSales([]));

    fetch("http://localhost:5000/customers")
      .then(res => res.json())
      .then(setCustomers)
      .catch(() => setCustomers([]));
  }, []);

  const lowStock = products.filter(p => p.quantity <= 5);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{products.length}</p>
        </div>

        <div className="card">
          <h3>Low Stock</h3>
          <p>{lowStock.length}</p>
        </div>

        <div className="card">
          <h3>Total Sales</h3>
          <p>{sales.length}</p>
        </div>

        <div className="card">
          <h3>Total Customers</h3>
          <p>{customers.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

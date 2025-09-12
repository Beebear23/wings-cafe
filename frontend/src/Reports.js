import React, { useState, useEffect } from "react";
import "./App.css";

function Reports() {
  const [stock, setStock] = useState({ products: [], lowStock: [] });
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reports/stock")
      .then(res => res.json())
      .then(setStock);

    fetch("http://localhost:5000/reports/sales")
      .then(res => res.json())
      .then(setSales);
  }, []);

  return (
    <div className="container">
      <h2>Reports</h2>

      {/* Stock Levels */}
      <div className="section">
        <h3>Stock Levels</h3>
        {stock.products.length === 0 ? (
          <p>No stock data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {stock.products.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Low Stock */}
      <div className="section low-stock-section">
        <h3>Low Stock Alert</h3>
        {stock.lowStock.length === 0 ? (
          <p>All products have sufficient stock</p>
        ) : (
          <ul>
            {stock.lowStock.map(p => (
              <li key={p.id}>{p.name} - Quantity: {p.quantity}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Sales History */}
      <div className="section">
        <h3>Sales History</h3>
        {sales.length === 0 ? (
          <p>No sales recorded</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Product ID</th><th>Quantity</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.productId}</td>
                  <td>{s.quantity}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;

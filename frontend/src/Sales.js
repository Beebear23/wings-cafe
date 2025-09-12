import React, { useState, useEffect } from "react";
import "./App.css";

function Sales() {
  const [sales, setSales] = useState([]);
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/sales")
      .then(res => res.json())
      .then(setSales);
  }, []);

  const addSale = () => {
    fetch("http://localhost:5000/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, quantity: parseInt(quantity) })
    })
      .then(res => res.json())
      .then(newSale => setSales([...sales, newSale]));

    setProduct("");
    setQuantity("");
  };

  return (
    <div className="container">
      <h2>Sales</h2>

      <div className="form-row">
        <input type="text" placeholder="Product name" value={product} onChange={e => setProduct(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button onClick={addSale}>Add Sale</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Product</th><th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;

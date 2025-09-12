import React, { useState, useEffect } from "react";
import "./App.css";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", category: "", price: "", quantity: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      const res = await fetch(`http://localhost:5000/products/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) })
      });
      const updated = await res.json();
      setProducts(products.map(p => p.id === editId ? updated : p));
      setEditId(null);
    } else {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), quantity: parseInt(form.quantity) })
      });
      const newProduct = await res.json();
      setProducts([...products, newProduct]);
    }
    setForm({ name: "", description: "", category: "", price: "", quantity: "" });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product.id);
  };

  return (
    <div className="container">
      <h2>Inventory</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <button type="submit">{editId ? "Update Product" : "Add Product"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Category</th><th>Price</th><th>Quantity</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button className="btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {products.length === 0 && <tr><td colSpan="6" style={{ textAlign: "center", color: "#555" }}>No products available</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;

import React, { useState, useEffect } from "react";
import "./App.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/customers")
      .then(res => res.json())
      .then(setCustomers);
  }, []);

  const addCustomer = () => {
    fetch("http://localhost:5000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    })
      .then(res => res.json())
      .then(newCustomer => setCustomers([...customers, newCustomer]));

    setName("");
    setEmail("");
  };

  return (
    <div className="container">
      <h2>Customers</h2>

      <div className="form-row">
        <input type="text" placeholder="Customer name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={addCustomer}>Add Customer</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;

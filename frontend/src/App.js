import React, { useState } from "react";
import Inventory from "./Inventory";
import Sales from "./Sales";
import Customers from "./Customers";
import Reports from "./Reports";
import pic from "./wings.jpg";
import "./App.css"; // Import the CSS file

function App() {
  const [module, setModule] = useState("inventory");

  return (
    <div className="container">
      <header className="app-header">
        <img src={pic} alt="Wings.jpg" className="logo" />
        <h1>Wings Cafe Inventory</h1>
      </header>

      <nav className="nav-buttons">
        <button onClick={() => setModule("inventory")}>Inventory</button>
        <button onClick={() => setModule("sales")}>Sales</button>
        <button onClick={() => setModule("customers")}>Customers</button>
        <button onClick={() => setModule("reports")}>Reports</button>
      </nav>

      {module === "inventory" && <Inventory />}
      {module === "sales" && <Sales />}
      {module === "customers" && <Customers />}
      {module === "reports" && <Reports />}
    </div>
  );
}

export default App;

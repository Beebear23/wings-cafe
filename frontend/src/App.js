import React, { useState } from "react";
import Inventory from "./Inventory";
import Sales from "./Sales";
import Customers from "./Customers";
import Reports from "./Reports";
import Dashboard from "./Dashboard";

function App() {
  const [module, setModule] = useState("dashboard"); // show dashboard by default

  return (
    <div className="app-container">
      <h1>Wings Cafe Inventory</h1>
      <nav className="nav-buttons">
        <button onClick={() => setModule("dashboard")}>Dashboard</button>
        <button onClick={() => setModule("inventory")}>Inventory</button>
        <button onClick={() => setModule("sales")}>Sales</button>
        <button onClick={() => setModule("customers")}>Customers</button>
        <button onClick={() => setModule("reports")}>Reports</button>
      </nav>

      <div className="module-view">
        {module === "dashboard" && <Dashboard />}
        {module === "inventory" && <Inventory />}
        {module === "sales" && <Sales />}
        {module === "customers" && <Customers />}
        {module === "reports" && <Reports />}
      </div>
    </div>
  );
}

export default App;

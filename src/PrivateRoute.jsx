import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import ProductForm from "./components/ProductForm";
import PendingVersions from "./components/PendingVersions";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <div>
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
          <ul style={{ listStyleType: "none", display: "flex", gap: "15px" }}>
            {isAuthenticated ? (
              <>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/pending">Pending</Link></li>
                <li>
                  <button onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={<PrivateRoute><Product /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
          <Route path="/pending" element={<PrivateRoute><PendingVersions /></PrivateRoute>} />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

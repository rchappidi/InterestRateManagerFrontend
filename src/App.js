// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Product from "./components/Product";
import ProductForm from "./components/ProductForm";
import EditProductForm from "./components/EditProductForm"; // ✅ NEW import
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
      setRole((payload.role || "").replace("ROLE_", ""));
        setUsername(payload.sub || "");
      } catch (err) {
        console.error("Invalid token:", err);
        setRole("");
        setUsername("");
      }
    } else {
      setIsAuthenticated(false);
      setRole("");
      setUsername("");
    }
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole((payload.role || "").replace("ROLE_", ""));
        setUsername(payload.sub || "");
      } catch (err) {
        console.error("Invalid token on login:", err);
        setRole("");
        setUsername("");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole("");
    setUsername("");
    window.location.href = "/login";
  };

  return (
    <Router>
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          role={role}
          username={username}
        />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Product />} />
              <Route path="/create" element={<ProductForm />} />
              <Route path="/products/:id/edit" element={<EditProductForm />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

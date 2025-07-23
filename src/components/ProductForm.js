// src/components/ProductForm.js
import React, { useState, useEffect } from "react";
import { createProduct, getProductById } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    productDescription: "",
    interestRate: "",
    effectiveStartDate: "",
    status: "INACTIVE",
  });

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId]);

  const loadProduct = async (id) => {
    try {
      const response = await getProductById(id);
      const data = response.data;

      // Format effectiveDate as 'YYYY-MM-DDTHH:mm' for datetime-local input
      const formattedDate = data.effectiveDate
        ? new Date(data.effectiveDate).toISOString().slice(0, 16)
        : "";

      setProduct({
        productId: data.productId,
        productName: data.productName,
        productDescription: data.productDescription,
        interestRate: data.interestRate,
        effectiveStartDate: formattedDate,
        status: data.status || "INACTIVE",
      });
    } catch (err) {
      console.error("Failed to load product:", err);
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct(product);
      navigate("/");
    } catch (err) {
      console.error("Failed to save product:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{productId ? "Create New Version" : "Create New Product"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Product ID</label>
          <input
            type="text"
            className="form-control"
            name="productId"
            value={product.productId}
            onChange={handleChange}
            required
            disabled={!!productId}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Interest Rate</label>
          <input
            type="number"
            className="form-control"
            name="interestRate"
            value={product.interestRate}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Effective Start Date</label>
          <input
            type="datetime-local"
            className="form-control"
            name="effectiveStartDate"
            value={product.effectiveDate}
            onChange={handleChange}
            required
          />
        </div>

        <input type="hidden" name="status" value={product.status} />

        <button className="btn btn-success" type="submit">
          {productId ? "Save Version" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

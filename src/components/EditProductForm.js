import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProductWithNewVersion } from "../api/api";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    productId: "",
    productName: "",
    productDescription: "",
    interestRate: "",
    version: "",
    effectiveStartDate: "",
  });

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId) => {
    try {
      const response = await getProductById(productId);
      const data = response.data;

      const formattedDate = data.effectiveStartDate
        ? new Date(data.effectiveStartDate).toISOString().slice(0, 16)
        : "";

      setProduct({
        productId: data.productId || "",
        productName: data.productName || "",
        productDescription: data.productDescription || "",
        interestRate: data.interestRate || "",
        version: data.version || "",
        effectiveStartDate: formattedDate,
      });
    } catch (error) {
      console.error("Error loading product by ID:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProductWithNewVersion(product);
      navigate("/");
    } catch (error) {
      console.error("Error submitting updated product version:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Product (Create New Version)</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Product ID</label>
          <input
            type="text"
            name="productId"
            value={product.productId}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Version</label>
          <input
            type="text"
            name="version"
            value={product.version}
            className="form-control"
            disabled
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Product Description</label>
          <input
            type="text"
            name="productDescription"
            value={product.productDescription}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Interest Rate</label>
          <input
            type="number"
            name="interestRate"
            value={product.interestRate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Effective Start Date</label>
          <input
            type="datetime-local"
            name="effectiveStartDate"
            value={product.effectiveStartDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Save New Version
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;

import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  updateProductStatusApproved,
  updateProductStatusRejected,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Product() {
  const [products, setProducts] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
    extractRoleFromToken();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  const extractRoleFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const role = (decoded.role || "").replace("ROLE_", "").toLowerCase();
      setUserRole(role);
    }
  };

  const handleEdit = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleUpdateStatusApproved = async (id) => {
    try {
      await updateProductStatusApproved(id);
      await loadProducts();
    } catch (err) {
      console.error("Failed to update product status:", err);
    }
  };

  const handleUpdateStatusRejected = async (id) => {
    try {
      await updateProductStatusRejected(id);
      await loadProducts();
    } catch (err) {
      console.error("Failed to update product status:", err);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Product List</h2>


      {(userRole === "maker" || userRole === "checker") && (
        <button
          className="btn btn-primary mb-3"
          onClick={() => navigate("/create")}
        >
          Create New Product
        </button>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Interest Rate</th>
            <th>Status</th>
            <th>Version</th>
            <th>Effective Start Date</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.productId}</td>
                <td>{p.productName}</td>
                <td>{p.productDescription}</td>
                <td>{p.interestRate}</td>
                <td
                  style={{
                    maxWidth: "200px",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                  }}
                >
                  {p.status}
                </td>
                <td>{p.version}</td>
                <td>
                  {p.effectiveStartDate ? formatDate(p.effectiveStartDate) : "-"}
                </td>
                <td>{formatDate(p.createdAt)}</td>
                <td>
                  {/* Update enabled for both maker and checker */}
                  <button
                    className="btn btn-sm btn-primary me-2 mb-1"
                    onClick={() => handleEdit(p.id)}
                    title="new product will be created"
                  >
                    Update
                  </button>

                  {/* Approve / Reject shown only to checker for pending products */}
                  {userRole === "checker" &&
                    p.status === "InActive - Pending for Approval" && (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2 mb-1"
                          onClick={() => handleUpdateStatusApproved(p.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger mb-1"
                          onClick={() => handleUpdateStatusRejected(p.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Product;

// src/api.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Auth
export const login = (credentials) => axios.post(`${BASE_URL}/auth/login`, credentials);
export const register = (userDetails) => axios.post(`${BASE_URL}/auth/register`, userDetails);

// Product APIs
export const getAllProducts = () => axios.get(`${BASE_URL}/products`, getAuthHeaders());
export const getProductById = (id) => axios.get(`${BASE_URL}/products/${id}`, getAuthHeaders());

export const createProduct = (productData) =>
  axios.post(`${BASE_URL}/products`, productData, getAuthHeaders());

// ✅ Update product with a new version
export const updateProductWithNewVersion = (productData) =>
  axios.post(`${BASE_URL}/products/update`, productData, getAuthHeaders());

// ✅ Fix: Call getAuthHeaders() to send token
export const updateProductStatusApproved = (id) =>
  axios.post(`${BASE_URL}/products/${id}/approve`, null, getAuthHeaders());

export const updateProductStatusRejected = (id) =>
  axios.post(`${BASE_URL}/products/${id}/reject`, null, getAuthHeaders());
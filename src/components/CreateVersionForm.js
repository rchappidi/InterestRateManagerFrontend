import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';

function CreateVersionForm() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [versionId, setVersionId] = useState('');
  const [effectiveStartDate, setEffectiveStartDate] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const versionPayload = {
        versionId,
        effectiveStartDate,
        interestRate,
        productId: product.productId
      };
      await axios.post('/api/product-versions', versionPayload);
      alert('Version request submitted for approval');
      navigate('/pending');
    } catch (error) {
      alert('Failed to submit version request');
      console.error(error);
    }
  };

  if (!product) return <div>Loading product info...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Version for: {product.name}</h2>
      <label>
        Version ID:
        <input
          type="text"
          value={versionId}
          onChange={(e) => setVersionId(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Effective Start Date:
        <input
          type="date"
          value={effectiveStartDate}
          onChange={(e) => setEffectiveStartDate(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Interest Rate (%):
        <input
          type="number"
          step="0.01"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="submit">Submit Version</button>
    </form>
  );
}

export default CreateVersionForm;

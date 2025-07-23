import React, { useEffect, useState } from 'react';
import axios from '../axios';

function Pending() {
  const [pendingVersions, setPendingVersions] = useState([]);

  useEffect(() => {
    const fetchPendingVersions = async () => {
      try {
        const response = await axios.get('/api/product-versions/pending');
        setPendingVersions(response.data);
      } catch (error) {
        console.error('Error fetching pending versions:', error);
      }
    };

    fetchPendingVersions();
  }, []);

  const handleAction = async (versionId, action) => {
    try {
      await axios.post(`/api/product-versions/${versionId}/${action}`);
      alert(`Version ${action}ed successfully`);
      setPendingVersions(pendingVersions.filter(v => v.versionId !== versionId));
    } catch (error) {
      alert(`Failed to ${action} version`);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Pending Product Versions</h2>
      {pendingVersions.length === 0 ? (
        <p>No pending versions</p>
      ) : (
        <ul>
          {pendingVersions.map(version => (
            <li key={version.versionId}>
              <strong>Product:</strong> {version.productName} |
              <strong> Version ID:</strong> {version.versionId} |
              <strong> Start Date:</strong> {version.effectiveStartDate} |
              <strong> Rate:</strong> {version.interestRate}%
              <br />
              <button onClick={() => handleAction(version.versionId, 'approve')}>Approve</button>
              <button onClick={() => handleAction(version.versionId, 'reject')}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Pending;

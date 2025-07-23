import React, { useEffect, useState } from 'react';
import axios from '../axios';

function PendingVersions() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      const response = await axios.get('/api/versions/pending');
      setPending(response.data);
    };
    fetchPending();
  }, []);

  const handleApprove = async (versionId) => {
    try {
      await axios.post(`/api/versions/${versionId}/approve`);
      alert('Version approved');
      setPending(pending.filter(v => v.id !== versionId));
    } catch (error) {
      alert('Approval failed');
    }
  };

  return (
    <div>
      <h2>Pending Versions</h2>
      <ul>
        {pending.map(version => (
          <li key={version.id}>
            Version {version.version} of {version.product.name} - <button onClick={() => handleApprove(version.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PendingVersions;
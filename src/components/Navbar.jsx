import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, handleLogout, role, username }) {
  return (
    <nav
      style={{
        padding: '10px',
        borderBottom: '1px solid #ccc',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <ul style={{ listStyleType: 'none', display: 'flex', gap: '15px', margin: 0, padding: 0 }}>
        {isAuthenticated ? (
          <>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/create">Create</Link></li>
            {role === 'checker' && <li><Link to="/pending">Pending</Link></li>}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>

      {isAuthenticated && (
        <div style={{ fontSize: '14px', color: '#555' }}>
          👤 <strong>{username}</strong> | <strong>{role}</strong>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

// client/src/pages/NotFoundPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const notFoundStyle = {
    textAlign: 'center',
    padding: '50px',
};

function NotFoundPage() {
  return (
    <div style={notFoundStyle}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>
        You can return to the <Link to="/dashboard">Dashboard</Link>.
      </p>
    </div>
  );
}

export default NotFoundPage;
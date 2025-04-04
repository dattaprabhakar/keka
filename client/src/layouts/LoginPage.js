// client/src/pages/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Basic styling
const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f0f2f5',
};

const loginFormStyle = {
    padding: '40px',
    background: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    background: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
};

const errorStyle = {
    color: 'red',
    marginBottom: '15px',
    fontSize: '14px',
};


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  // Need to wait for auth loading state to resolve first
  useEffect(() => {
      if (!authLoading && isAuthenticated) {
           const from = location.state?.from?.pathname || '/dashboard'; // Redirect back or to dashboard
           navigate(from, { replace: true });
      }
  }, [isAuthenticated, authLoading, navigate, location]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      await login({ email, password });
      // Navigation is now handled by the useEffect hook above
      // const from = location.state?.from?.pathname || '/dashboard';
      // navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Don't render the form if auth state is still loading or if already authenticated
  if (authLoading) {
      return <div>Loading authentication state...</div>;
  }
  if (isAuthenticated) {
      return null; // Or a redirect component, handled by useEffect
  }

  return (
    <div style={loginContainerStyle}>
      <form onSubmit={handleSubmit} style={loginFormStyle}>
        <h2>Login to Keka Clone</h2>
        {error && <p style={errorStyle}>{error}</p>}
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {/* Add forgot password link, etc. if needed */}
      </form>
    </div>
  );
}

export default LoginPage;
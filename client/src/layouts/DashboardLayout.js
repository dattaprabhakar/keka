// client/src/layouts/DashboardLayout.js
import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have this context

// Basic styling (replace with your actual CSS/UI library)
const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
};

const sidebarStyle = {
  width: '220px',
  background: '#f4f4f4',
  padding: '20px',
  borderRight: '1px solid #ddd',
};

const contentStyle = {
  flexGrow: 1,
  padding: '20px',
};

const navLinkStyle = {
  display: 'block',
  marginBottom: '10px',
  textDecoration: 'none',
  color: '#333',
};

const headerStyle = {
    background: '#eee',
    padding: '10px 20px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
};

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <div style={layoutStyle}>
      {/* --- Sidebar --- */}
      <div style={sidebarStyle}>
        <h3>Keka Clone</h3>
        <nav>
          <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
          <Link to="/employees" style={navLinkStyle}>Employees</Link>
          <Link to="/leave-requests" style={navLinkStyle}>Leave Requests</Link>
          {/* Add more links based on user roles/modules */}
          {/* Example Admin Link:
          {user?.roles?.includes('admin') && (
            <Link to="/admin/settings" style={navLinkStyle}>Admin Settings</Link>
          )}
           */}
        </nav>
      </div>

      {/* --- Main Content Area --- */}
      <div style={contentStyle}>
         {/* --- Top Header Bar --- */}
        <header style={headerStyle}>
            <div>
                {/* Placeholder for breadcrumbs or page title */}
                <h4>Welcome, {user?.email || 'User'}!</h4> {/* Display user info */}
            </div>
            <button onClick={handleLogout}>Logout</button>
        </header>

        {/* --- Page Content (Rendered by nested routes) --- */}
        <main>
          <Outlet /> {/* This is where the specific page component will be rendered */}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
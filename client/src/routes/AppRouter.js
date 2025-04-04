// client/src/routes/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout'; // Example layout with Navbar/Sidebar

// Pages
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import EmployeeListPage from '../pages/EmployeeListPage';
import EmployeeDetailPage from '../pages/EmployeeDetailPage';
import LeaveRequestPage from '../pages/LeaveRequestPage';
import NotFoundPage from '../pages/NotFoundPage';
// Import other pages...

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
      return <div>Loading Auth State...</div>; // Or a loading spinner
  }

  if (!isAuthenticated) {
    // Redirect to login page, saving the location they were trying to go to
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component
}

// Optional: Role-based route protection
/*
function AdminRoute({ children }) {
    const { isAuthenticated, user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!isAuthenticated || !user?.roles?.includes('admin')) { // Check role
        return <Navigate to="/dashboard" replace />; // Or to an unauthorized page
    }
    return children;
}
*/


function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout /> {/* Use a layout for nested routes */}
            </ProtectedRoute>
          }
        >
           {/* Nested routes inherit the layout */}
           <Route index element={<Navigate to="/dashboard" replace />} /> {/* Default route */}
           <Route path="dashboard" element={<DashboardPage />} />
           <Route path="employees" element={<EmployeeListPage />} />
           <Route path="employees/:id" element={<EmployeeDetailPage />} />
           <Route path="leave-requests" element={<LeaveRequestPage />} />
           {/* Add other protected routes here */}
           {/* Example Admin Route:
           <Route path="admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
           */}
        </Route>


        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
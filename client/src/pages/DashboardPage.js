// client/src/pages/DashboardPage.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Optional: if you want to display user info

function DashboardPage() {
  const { user } = useAuth(); // Get user info if needed

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back, {user?.email || 'User'}!</p>
      <p>This is the main dashboard area. You can add widgets, summaries, and quick links here.</p>
      {/* Add dashboard content here */}
      {/* Examples:
         - Quick stats (pending leaves, upcoming holidays)
         - Recent announcements
         - Links to common actions
      */}
    </div>
  );
}

export default DashboardPage;
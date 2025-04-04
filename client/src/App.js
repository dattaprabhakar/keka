// client/src/App.js
import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter';
import './App.css'; // Optional: Import global styles

function App() {
  return (
    <AuthProvider> {/* Wrap routes with AuthProvider */}
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
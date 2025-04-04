// client/src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, /* other auth functions */ } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info (id, email, roles)
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true); // Check initial auth state

  useEffect(() => {
    // TODO: Add logic here to verify the token on initial load
    // e.g., make an API call to '/api/auth/verify' or '/api/users/me'
    // If token is valid, fetch user data and setUser, setToken
    // If invalid, clear token and setUser(null)
    const verifyToken = async () => {
        if (token) {
            try {
                 // Example: You might have a /me endpoint that returns user data based on token
                 // const userData = await getMyProfile();
                 // setUser(userData);
                 // For now, we just assume token means logged in for simplicity
                 // A real app needs server-side verification here!
                 console.warn("Auth Persistence: Need to implement token verification on load.");
                 // Placeholder: Decode token locally (INSECURE FOR ROLES/DATA, ok for expiry check)
                 // setUser({ id: decoded.id, email: decoded.email, roles: decoded.roles });
            } catch (error) {
                console.error("Token verification failed:", error);
                localStorage.removeItem('authToken');
                setToken(null);
                setUser(null);
            }
        }
        setLoading(false);
    };

    verifyToken();
  }, [token]); // Run when token changes (e.g., after login/logout)


  const login = async (credentials) => {
    try {
      const { accessToken, user: userData } = await apiLogin(credentials);
      localStorage.setItem('authToken', accessToken);
      setToken(accessToken);
      setUser(userData); // Assuming login API returns user info
      return true; // Indicate success
    } catch (error) {
      console.error("Login failed:", error);
      logout(); // Clear any potentially bad state
      throw error; // Re-throw for the login form to handle
    }
  };

  const logout = () => {
    // Optional: Call an API endpoint to invalidate the token server-side
    // apiLogout();
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user, // Basic check, enhance with token expiry/verification
    loading,
    login,
    logout,
  };

  // Don't render children until initial auth check is done
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
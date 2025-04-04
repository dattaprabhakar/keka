// client/src/api/auth.js
import axios from 'axios';

// Ensure this points to your backend's base URL
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/auth';

export const login = async (credentials) => {
  try {
    // credentials should be an object like { email: '...', password: '...' }
    const response = await axios.post(`${API_URL}/signin`, credentials);
    if (response.data.accessToken) {
      // Consider storing user data from response.data.user in context as well
      return response.data; // { user: {...}, accessToken: '...' }
    } else {
      throw new Error("Login failed: No access token received.");
    }
  } catch (error) {
    console.error("API Login Error:", error.response?.data || error.message);
    // Rethrow a more specific error message if possible
    throw new Error(error.response?.data?.message || "Login failed. Please check credentials.");
  }
};

// Optional: getAuthHeader function (can live here or in a separate utils file)
export const getAuthHeader = () => {
     const token = localStorage.getItem('authToken'); // Assumes token is stored here by AuthContext
     if (token) {
         return { 'x-access-token': token };
         // Or: return { 'Authorization': `Bearer ${token}` }; depends on backend setup
     } else {
         return {};
     }
};


// Add signup function if needed
/*
export const signup = async (userData) => {
    // ... implementation ...
};
*/

// Optional: Logout could just clear local storage, or call a backend endpoint
export const logout = () => {
     // For context/local state management, this is usually handled in AuthContext.js
     // If you have a backend /logout endpoint to invalidate tokens:
     // try {
     //     await axios.post(`${API_URL}/signout`, {}, { headers: getAuthHeader() });
     // } catch (error) {
     //     console.error("API Logout Error:", error.response?.data || error.message);
     // }
};
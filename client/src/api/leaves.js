// client/src/api/leaves.js
import axios from 'axios';
import { getAuthHeader } from './auth'; // Reuse the header function

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Fetch leave requests for the logged-in user
export const getMyLeaveRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaves/my`, {
      headers: getAuthHeader(),
    });
    return response.data; // Expects an array of leave request objects
  } catch (error) {
    console.error("Error fetching leave requests:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch leave requests");
  }
};

// Submit a new leave request
export const submitLeaveRequest = async (leaveData) => {
    // leaveData expected: { leaveType, startDate, endDate, reason }
  try {
    const response = await axios.post(`${API_URL}/leaves`, leaveData, {
      headers: getAuthHeader(),
    });
    return response.data; // Returns the newly created leave request object
  } catch (error) {
    console.error("Error submitting leave request:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to submit leave request");
  }
};

// Add functions for fetching balance, cancelling requests, approving/rejecting (for managers) etc.
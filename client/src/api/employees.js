// client/src/api/employees.js
import axios from 'axios';
import { getAuthHeader } from './auth'; // Helper to get JWT token

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const getEmployees = async (page = 1, size = 10, search = '') => {
  try {
    const response = await axios.get(`${API_URL}/employees`, {
      headers: getAuthHeader(), // Include JWT token
      params: { page, size, search }
    });
    return response.data; // { totalItems, employees, totalPages, currentPage }
  } catch (error) {
    console.error("Error fetching employees:", error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to fetch employees");
  }
};

export const getEmployeeById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/employees/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error.response?.data || error.message);
      throw error.response?.data || new Error("Failed to fetch employee details");
    }
};

export const createEmployee = async (employeeData) => {
    try {
        const response = await axios.post(`${API_URL}/employees`, employeeData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (error) {
        console.error("Error creating employee:", error.response?.data || error.message);
        throw error.response?.data || new Error("Failed to create employee");
    }
};

// Add functions for updateEmployee, deleteEmployee etc.
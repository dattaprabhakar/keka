// client/src/pages/EmployeeDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeById } from '../api/employees'; // Ensure you have this API function

function EmployeeDetailPage() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the employee ID from the URL parameter

  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return; // Should not happen with correct routing, but good practice

      setLoading(true);
      setError(null);
      try {
        const data = await getEmployeeById(id);
        setEmployee(data);
      } catch (err) {
        setError(err.message || `Failed to load employee details for ID ${id}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]); // Re-fetch if the ID changes

  if (loading) {
    return <p>Loading employee details...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  // Basic display styling
  const detailItemStyle = { marginBottom: '10px' };
  const labelStyle = { fontWeight: 'bold', marginRight: '8px' };

  return (
    <div>
      <h2>Employee Details - {employee.firstName} {employee.lastName}</h2>
      <Link to="/employees">← Back to Employee List</Link>
      <hr />

      <div style={detailItemStyle}>
        <span style={labelStyle}>Employee ID:</span> {employee.employeeId}
      </div>
      <div style={detailItemStyle}>
        <span style={labelStyle}>First Name:</span> {employee.firstName}
      </div>
      <div style={detailItemStyle}>
        <span style={labelStyle}>Last Name:</span> {employee.lastName}
      </div>
      <div style={detailItemStyle}>
        <span style={labelStyle}>Email:</span> {employee.email}
      </div>
      <div style={detailItemStyle}>
        <span style={labelStyle}>Job Title:</span> {employee.jobTitle || 'N/A'}
      </div>
      <div style={detailItemStyle}>
        <span style={labelStyle}>Department:</span> {employee.department || 'N/A'}
      </div>
       <div style={detailItemStyle}>
        <span style={labelStyle}>Joining Date:</span> {employee.joiningDate ? new Date(employee.joiningDate).toLocaleDateString() : 'N/A'}
      </div>
       {/* Add more fields as needed */}

      {/* Add Edit/Delete buttons based on permissions */}
      {/* Example:
       <button onClick={() => navigate(`/employees/${id}/edit`)}>Edit</button>
      */}
    </div>
  );
}

export default EmployeeDetailPage;
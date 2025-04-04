// client/src/pages/EmployeeListPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { getEmployees } from '../api/employees';
import { Link } from 'react-router-dom'; // Assuming React Router

function EmployeeListPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchEmployeesData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees(page, 10, search); // Fetch page 'page', 10 items per page, with search term
      setEmployees(data.employees);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || 'Failed to load employees');
    } finally {
      setLoading(false);
    }
  }, [page, search]); // Re-run effect if page or search changes

  useEffect(() => {
    fetchEmployeesData();
  }, [fetchEmployeesData]); // Dependency array includes the memoized function

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1); // Reset to first page on new search
  };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchEmployeesData(); // Trigger fetch manually on submit if desired, or rely on useEffect
    };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };


  return (
    <div>
      <h2>Employee List</h2>

      <form onSubmit={handleSearchSubmit}>
         <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={search}
            onChange={handleSearchChange}
            style={{ marginRight: '10px' }}
         />
         {/* <button type="submit">Search</button> */} {/* Optional explicit search button */}
      </form>


      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Job Title</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id}> {/* Use primary key 'id' for React key */}
                  <td>{emp.employeeId}</td>
                  <td>{emp.firstName} {emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td>{emp.jobTitle || '-'}</td>
                  <td>{emp.department || '-'}</td>
                  <td>
                    <Link to={`/employees/${emp.id}`}>View</Link>
                    {/* Add Edit/Delete links based on permissions */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

           {/* Pagination Controls */}
          <div>
            <button onClick={handlePreviousPage} disabled={page <= 1}>
              Previous
            </button>
            <span> Page {page} of {totalPages} </span>
            <button onClick={handleNextPage} disabled={page >= totalPages}>
              Next
            </button>
          </div>
        </>
      )}
       {/* Link to add employee page (check permissions) */}
       {/* <Link to="/employees/new">Add New Employee</Link> */}
    </div>
  );
}

export default EmployeeListPage;
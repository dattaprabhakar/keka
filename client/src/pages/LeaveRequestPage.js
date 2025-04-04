// client/src/pages/LeaveRequestPage.js
import React from 'react';
// In a real app, you'd import API functions for leaves, useState, useEffect, etc.
// import { getLeaveBalance, submitLeaveRequest, getMyLeaveRequests } from '../api/leaves';

function LeaveRequestPage() {
  // --- Placeholder State (Replace with actual data fetching) ---
  const leaveBalance = {
    casual: 10,
    sick: 8,
    earned: 15,
  };
  const pastRequests = [
     { id: 1, type: 'Casual', startDate: '2023-10-20', endDate: '2023-10-20', status: 'Approved' },
     { id: 2, type: 'Sick', startDate: '2023-09-15', endDate: '2023-09-15', status: 'Approved' },
     { id: 3, type: 'Earned', startDate: '2024-01-05', endDate: '2024-01-10', status: 'Pending' },
  ];

  // --- Placeholder Form Handlers (Implement logic) ---
  const handleRequestSubmit = (event) => {
      event.preventDefault();
      alert('Leave request submission logic not implemented yet.');
      // TODO: Get form data, call API (submitLeaveRequest), handle response
  };

  return (
    <div>
      <h2>Leave Management</h2>

      {/* --- Leave Balance Section --- */}
      <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3>Your Leave Balance</h3>
        <ul>
          <li>Casual Leave: {leaveBalance.casual} days</li>
          <li>Sick Leave: {leaveBalance.sick} days</li>
          <li>Earned Leave: {leaveBalance.earned} days</li>
        </ul>
         {/* TODO: Fetch this data from API */}
      </section>

      {/* --- Request Form Section --- */}
      <section style={{ marginBottom: '30px', padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h3>Request Leave</h3>
        <form onSubmit={handleRequestSubmit}>
          {/* TODO: Build a proper form with date pickers, type selection, reason input */}
          <div>
              <label htmlFor="leaveType">Leave Type: </label>
              <select id="leaveType" required>
                  <option value="">-- Select --</option>
                  <option value="casual">Casual Leave</option>
                  <option value="sick">Sick Leave</option>
                  <option value="earned">Earned Leave</option>
              </select>
          </div>
          <div style={{marginTop: '10px'}}>
              <label htmlFor="startDate">Start Date: </label>
              <input type="date" id="startDate" required />
          </div>
           <div style={{marginTop: '10px'}}>
              <label htmlFor="endDate">End Date: </label>
              <input type="date" id="endDate" required />
          </div>
           <div style={{marginTop: '10px'}}>
              <label htmlFor="reason">Reason: </label>
              <textarea id="reason" rows="3" style={{width: '100%', boxSizing: 'border-box'}}></textarea>
          </div>
          <button type="submit" style={{marginTop: '15px'}}>Submit Request</button>
        </form>
      </section>

      {/* --- Past Requests Section --- */}
       <section style={{ padding: '15px', border: '1px solid #eee', borderRadius: '5px' }}>
         <h3>Your Past Requests</h3>
         {/* TODO: Fetch this data from API and map through it */}
         {pastRequests.length > 0 ? (
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                 <thead>
                     <tr style={{borderBottom: '1px solid #ddd', textAlign: 'left'}}>
                         <th>Type</th>
                         <th>Start Date</th>
                         <th>End Date</th>
                         <th>Status</th>
                     </tr>
                 </thead>
                 <tbody>
                    {pastRequests.map(req => (
                        <tr key={req.id} style={{borderBottom: '1px solid #eee'}}>
                            <td>{req.type}</td>
                            <td>{req.startDate}</td>
                            <td>{req.endDate}</td>
                            <td>{req.status}</td>
                        </tr>
                    ))}
                 </tbody>
            </table>
         ) : (
            <p>You haven't submitted any leave requests yet.</p>
         )}
      </section>
    </div>
  );
}

export default LeaveRequestPage;
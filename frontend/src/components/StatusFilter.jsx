// src/components/StatusFilter.js
import React, { useContext } from 'react';
import { JobContext } from '../context/JobContext';

const StatusFilter = () => {
  const { filterStatus, setFilterStatus } = useContext(JobContext);

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center">
        <label htmlFor="status-filter" className="mr-2 text-gray-700 font-medium">
          Filter by Status:
        </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={handleFilterChange}
          className="form-input w-auto text-black border-gray-500 border rounded-md"
        >
          <option value="All">All Applications</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default StatusFilter;
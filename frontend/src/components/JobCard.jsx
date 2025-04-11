// src/components/JobCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Interview':
        return 'bg-purple-100 text-purple-800';
      case 'Offer':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link to={`/jobs/${job._id}`} className="card hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-800 truncate">{job.company}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(job.status)}`}>
            {job.status}
          </span>
        </div>
        <p className="text-gray-600 mt-1 truncate">{job.role}</p>
      </div>
      <div className="p-4 bg-gray-50 text-sm text-gray-500">
        Applied: {formatDate(job.appliedDate)}
      </div>
    </Link>
  );
};

export default JobCard;
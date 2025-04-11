import React from 'react';
import JobCard from './JobCard';

function JobList({ jobs, updateJobStatus, deleteJob }) {
  return (
    <div className="job-list">
      <h2>Your Job Applications</h2>
      {jobs.length === 0 ? (
        <p>No job applications found. Add one to get started!</p>
      ) : (
        <div className="job-cards-container">
          {jobs.map(job => (
            <JobCard 
              key={job._id} 
              job={job} 
              updateJobStatus={updateJobStatus} 
              deleteJob={deleteJob} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';
import StatusFilter from '../components/StatusFilter';

const Dashboard = () => {
  const { filteredJobs, loading, error } = useContext(JobContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
        <Link to="/add" className="btn btn-primary">
          Add New Job
        </Link>
      </div>
      
      <StatusFilter />
      
      {filteredJobs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No job applications found.</p>
          <Link to="/add" className="text-primary-600 hover:underline mt-2 inline-block">
            Add your first job application
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredJobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
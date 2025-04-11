// src/pages/JobDetails.js
import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  CalendarIcon,
  LinkIcon,
  BriefcaseIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, updateJob, deleteJob, loading } = useContext(JobContext);
  const [job, setJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: '',
    appliedDate: '',
    link: ''
  });

  useEffect(() => {
    if (jobs.length > 0) {
      const foundJob = jobs.find(j => j._id === id);
      if (foundJob) {
        setJob(foundJob);
        setFormData({
          company: foundJob.company,
          role: foundJob.role,
          status: foundJob.status,
          appliedDate: new Date(foundJob.appliedDate).toISOString().split('T')[0],
          link: foundJob.link || ''
        });
      } else {
        navigate('/not-found');
      }
    }
  }, [id, jobs, navigate]);

  if (loading || !job) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob(id, formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating job:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      try {
        await deleteJob(id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting job:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Offer':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'Rejected':
        return <XCircleIcon className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status) => {
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
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-xl font-bold mb-6">Edit Job Application</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="company">
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="role">
                Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="appliedDate">
                Date Applied
              </label>
              <input
                type="date"
                id="appliedDate"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="link">
                Link (Optional)
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                    <BuildingOfficeIcon className="h-6 w-6 mr-2 text-gray-600" />
                    {job.company}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1 flex items-center">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                    {job.role}
                  </p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(job.status)}`}>
                  {getStatusIcon(job.status)}
                  <span className={getStatusIcon(job.status) ? "ml-1" : ""}>{job.status}</span>
                </span>
              </div>
              
              <div className="mt-6 space-y-4">
                <p className="flex items-center text-gray-600">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                  Applied on {formatDate(job.appliedDate)}
                </p>
                
                {job.link && (
                  <p className="flex items-center text-gray-600">
                    <LinkIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <a 
                      href={job.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Application Link
                    </a>
                  </p>
                )}
              </div>
              
              <div className="mt-8 flex space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      
      <button
        onClick={() => navigate('/')}
        className="mt-6 text-white hover:underline flex items-center"
      >
        &larr; Back to Dashboard
      </button>
    </div>
  );
};

export default JobDetails;
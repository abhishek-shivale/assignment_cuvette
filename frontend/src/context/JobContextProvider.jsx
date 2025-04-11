// src/context/JobContext.js
import React, {  useState, useEffect } from 'react';
import axios from 'axios';
import { JobContext } from './JobContext';


const API_URL = 'https://assignmentcuvette-production.up.railway.app/api';

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/jobs`);
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Add a new job
  const addJob = async (jobData) => {
    try {
      const response = await axios.post(`${API_URL}/jobs`, jobData);
      setJobs([...jobs, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update job
  const updateJob = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/jobs/${id}`, updatedData);
      setJobs(jobs.map(job => job._id === id ? response.data : job));
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete a job
  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Filter jobs based on status
  useEffect(() => {
    if (filterStatus === 'All') {
      setFilteredJobs(jobs);
    } else {
      setFilteredJobs(jobs.filter(job => job.status === filterStatus));
    }
  }, [filterStatus, jobs]);

  // Load jobs on initial mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <JobContext.Provider value={{
      jobs,
      filteredJobs,
      loading,
      error,
      filterStatus,
      setFilterStatus,
      fetchJobs,
      addJob,
      updateJob,
      deleteJob
    }}>
      {children}
    </JobContext.Provider>
  );
};
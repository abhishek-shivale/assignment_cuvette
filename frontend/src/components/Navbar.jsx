// src/components/Navbar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseIcon className="h-8 w-8" />
            <span className="text-xl font-bold">Student Job Tracker</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/' ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              to="/add" 
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/add' ? 'bg-primary-800' : 'hover:bg-primary-600'
              }`}
            >
              Add Job
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
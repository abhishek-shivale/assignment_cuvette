import "./App.css"
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AddJob from './pages/AddJob.jsx';
import JobDetails from './pages/JobDetails.jsx';
import NotFound from './pages/NotFound.jsx';
import { JobProvider } from './context/JobContextProvider.jsx';

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="min-h-screen min-w-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddJob />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;
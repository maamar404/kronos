import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

export const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if admin is already logged in
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Call the backend admin login endpoint
      const response = await axios.post(`${API_URL}/admin/login`, {
        username: credentials.username,
        password: credentials.password
      });
      
      if (response.data && response.data.success) {
        localStorage.setItem('adminAuthenticated', 'true');
        if (response.data.token) {
          localStorage.setItem('adminToken', response.data.token);
        }
        navigate('/admin/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-[#2F3AE4]/20 blur-3xl rounded-full -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b8f200]/10 blur-3xl rounded-full translate-y-1/3"></div>
      
      <div className="relative z-10 bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700 backdrop-blur-sm">
        {/* Logo/Brand element with gradient */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-[#2F3AE4] to-[#b8f200] p-0.5">
            <div className="h-full w-full bg-gray-800 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#b8f200]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
          <p className="text-gray-400 mt-2">Restricted access - Administrators only</p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#2F3AE4] to-[#b8f200] rounded-full mx-auto mt-4"></div>
        </div>
        
        {error && (
          <div className="bg-red-900/40 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="adminUsername">
              Admin Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                id="adminUsername"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="bg-gray-700 shadow-sm border border-gray-600 rounded-lg w-full py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#2F3AE4] focus:border-transparent transition-all duration-200"
                placeholder="Enter admin username"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="adminPassword">
              Admin Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="adminPassword"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="bg-gray-700 shadow-sm border border-gray-600 rounded-lg w-full py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-[#2F3AE4] focus:border-transparent transition-all duration-200"
                placeholder="Enter admin password"
                required
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className={`relative overflow-hidden group bg-gradient-to-r from-[#2F3AE4] to-[#2F3AE4] hover:from-[#2F3AE4] hover:to-[#b8f200] text-white font-medium py-3 px-4 rounded-lg shadow-lg transition-all duration-300 w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              <span className="relative z-10 flex items-center justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Access Admin Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
        
        <div className="mt-8 text-center">
          <a href="/" className="text-[#b8f200] hover:text-[#b8f200]/80 text-sm font-medium transition-colors">
            Return to main site
          </a>
        </div>
      </div>
    </div>
  );
};
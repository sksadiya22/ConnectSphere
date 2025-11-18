// API Configuration for different environments
const isDevelopment = process.env.NODE_ENV === 'development';
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Production backend URL
const PRODUCTION_API_URL = 'https://lifescroll.onrender.com';

// Use environment variable first, then check if local/development, otherwise use production URL
export const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (isDevelopment || isLocalhost ? 'http://localhost:5001' : PRODUCTION_API_URL);
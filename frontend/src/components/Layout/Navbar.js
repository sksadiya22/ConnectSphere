import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-blog"></i> LifeScroll
        </Link>
        
        <ul className="navbar-nav">
          <li>
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/create-post" 
                  className={`nav-link ${isActive('/create-post') ? 'active' : ''}`}
                >
                  <i className="fas fa-plus"></i> Create Post
                </Link>
              </li>
              <li>
                <Link 
                  to="/profile" 
                  className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
                >
                  <i className="fas fa-user"></i> Profile
                </Link>
              </li>
              <li>
                <span className="nav-link">
                  Welcome, {user?.username}!
                </span>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link 
                  to="/login" 
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                >
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                >
                  <i className="fas fa-user-plus"></i> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
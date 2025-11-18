import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Layout/Navbar';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreatePost from './components/Posts/CreatePost';
import PostDetail from './components/Posts/PostDetail';
import EditPost from './components/Posts/EditPost';
import Profile from './components/Pages/Profile';
import PrivateRoute from './components/Layout/PrivateRoute';

// Styles
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route 
            path="/create-post" 
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/edit-post/:id" 
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } 
          />
        </Routes>
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
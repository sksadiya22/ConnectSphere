import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostCard from '../Posts/PostCard';
import moment from 'moment';
import { API_BASE_URL } from '../../config';

const Profile = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserPosts(currentPage);
      fetchUserStats();
    }
  }, [user, currentPage]);

  const fetchUserPosts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts/user/${user.id}?page=${page}&limit=5`);
      setUserPosts(res.data.posts);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error('Error loading your posts');
    }
    setLoading(false);
  };

  const fetchUserStats = async () => {
    try {
      // Calculate stats from user posts
      const res = await axios.get(`${API_BASE_URL}/api/posts/user/${user.id}?limit=1000`);
      const posts = res.data.posts;
      
      const totalPosts = posts.length;
      const totalLikes = posts.reduce((sum, post) => sum + (post.likesCount || 0), 0);
      const totalComments = posts.reduce((sum, post) => sum + (post.commentsCount || 0), 0);
      
      setStats({ totalPosts, totalLikes, totalComments });
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const handlePostUpdate = () => {
    fetchUserPosts(currentPage);
    fetchUserStats();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!user) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Loading profile...
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-header">
        <div className="card">
          <div className="profile-info">
            <div className="profile-avatar">
              <i className="fas fa-user-circle" style={{ fontSize: '4rem', color: '#667eea' }}></i>
            </div>
            <div className="profile-details">
              <h1>{user.username}</h1>
              <p className="text-muted">{user.email}</p>
              <p className="text-muted">
                <i className="fas fa-calendar"></i> 
                Member since {moment(user.createdAt).format('MMMM YYYY')}
              </p>
              {user.role === 'admin' && (
                <span className="badge badge-admin">
                  <i className="fas fa-crown"></i> Admin
                </span>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <div className="stat-number">{stats.totalPosts}</div>
              <div className="stat-label">Posts</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.totalLikes}</div>
              <div className="stat-label">Likes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.totalComments}</div>
              <div className="stat-label">Comments</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-posts">
        <h2>
          <i className="fas fa-blog"></i> My Posts
        </h2>

        {loading ? (
          <div className="loading">
            <i className="fas fa-spinner fa-spin"></i> Loading your posts...
          </div>
        ) : userPosts.length === 0 ? (
          <div className="no-posts">
            <div className="card text-center">
              <h3>No posts yet</h3>
              <p>Start sharing your thoughts with the world!</p>
              <a href="/create-post" className="btn btn-primary">
                <i className="fas fa-plus"></i> Create Your First Post
              </a>
            </div>
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {userPosts.map(post => (
                <PostCard 
                  key={post._id} 
                  post={post} 
                  onPostUpdate={handlePostUpdate}
                />
              ))}
            </div>

            {pagination.pages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>

                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`btn ${currentPage === page ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.pages}
                  className="btn btn-secondary"
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
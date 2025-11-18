import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PostCard from '../Posts/PostCard';
import { API_BASE_URL } from '../../config';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts?page=${page}&limit=5`);
      setPosts(res.data.posts);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error('Error loading posts');
    }
    setLoading(false);
  };

  const handlePostUpdate = () => {
    fetchPosts(currentPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Loading posts...
      </div>
    );
  }

  return (
    <div className="container">
      <div className="home-header">
        <h1>
          <i className="fas fa-blog"></i> Latest Blog Posts
        </h1>
        <p className="text-muted">
          Discover amazing stories and insights from our community
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts">
          <div className="card text-center">
            <h3>No posts yet</h3>
            <p>Be the first to create a post!</p>
            <a href="/create-post" className="btn btn-primary">
              <i className="fas fa-plus"></i> Create First Post
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="posts-grid">
            {posts.map(post => (
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

          <div className="posts-info text-center text-muted">
            Showing {posts.length} of {pagination.total} posts
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
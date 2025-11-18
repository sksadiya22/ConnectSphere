import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import CommentSection from '../Comments/CommentSection';
import { getImageUrl } from '../../utils/imageUtils';
import { API_BASE_URL } from '../../config';

const PostDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
      setPost(res.data);
      setLiked(res.data.likes?.some(like => like.user === user?.id) || false);
      setLikesCount(res.data.likesCount || 0);
    } catch (error) {
      toast.error('Post not found');
      navigate('/');
    }
    setLoading(false);
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/posts/${id}/like`);
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error liking post');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/posts/${id}`);
        toast.success('Post deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting post');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container">
        <div className="error">Post not found</div>
      </div>
    );
  }

  const canEditDelete = user && (user.id === post.author._id || user.role === 'admin');

  return (
    <div className="container">
      <article className="post-detail">
        <div className="card">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-meta">
              <div className="post-author">
                <i className="fas fa-user"></i>
                <span>{post.author.username}</span>
              </div>
              <div className="post-date">
                <i className="fas fa-calendar"></i>
                <span>{moment(post.createdAt).format('MMMM DD, YYYY')}</span>
              </div>
              {post.updatedAt !== post.createdAt && (
                <div className="post-updated">
                  <i className="fas fa-edit"></i>
                  <span>Updated {moment(post.updatedAt).format('MMMM DD, YYYY')}</span>
                </div>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {post.image && (
            <div className="post-image">
              <img 
                src={getImageUrl(post.image)} 
                alt={post.title}
                style={{ 
                  width: '100%', 
                  maxHeight: '400px', 
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="post-content">
            <div 
              className="post-body"
              style={{ 
                lineHeight: '1.8', 
                fontSize: '16px',
                whiteSpace: 'pre-wrap'
              }}
            >
              {post.content}
            </div>
          </div>

          <div className="post-actions">
            <div className="post-stats">
              <button 
                className={`like-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
              >
                <i className={`fas fa-heart ${liked ? 'text-danger' : ''}`}></i>
                <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
              </button>
              <span className="comment-count">
                <i className="fas fa-comment"></i>
                <span>{post.commentsCount || 0} Comments</span>
              </span>
            </div>

            <div className="post-controls">
              <Link to="/" className="btn btn-secondary">
                <i className="fas fa-arrow-left"></i> Back to Posts
              </Link>
              
              {canEditDelete && (
                <>
                  <Link 
                    to={`/edit-post/${post._id}`} 
                    className="btn btn-primary"
                    style={{ marginLeft: '10px' }}
                  >
                    <i className="fas fa-edit"></i> Edit Post
                  </Link>
                  <button 
                    onClick={handleDelete}
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                  >
                    <i className="fas fa-trash"></i> Delete Post
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <CommentSection postId={id} />
      </article>
    </div>
  );
};

export default PostDetail;
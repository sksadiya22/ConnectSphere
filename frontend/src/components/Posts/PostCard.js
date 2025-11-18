import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { getImageUrl } from '../../utils/imageUtils';
import { API_BASE_URL } from '../../config';

const PostCard = ({ post, onPostUpdate }) => {
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(
    post.likes?.some(like => like.user === user?.id) || false
  );
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to like posts');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/posts/${post._id}/like`);
      setLiked(res.data.liked);
      setLikesCount(res.data.likesCount);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error liking post');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/posts/${post._id}`);
        toast.success('Post deleted successfully');
        if (onPostUpdate) onPostUpdate();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting post');
      }
    }
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const canEditDelete = user && (user.id === post.author._id || user.role === 'admin');

  return (
    <div className="post-card">
      <div className="post-card-header">
        <Link to={`/post/${post._id}`} className="post-title">
          {post.title}
        </Link>
        <div className="post-meta">
          <div className="post-author">
            <i className="fas fa-user"></i>
            <span>{post.author.username}</span>
          </div>
          <div className="post-date">
            <i className="fas fa-calendar"></i>
            <span>{moment(post.createdAt).format('MMM DD, YYYY')}</span>
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
        </div>
      </div>

      {post.image && (
        <div className="post-card-image">
          <img 
            src={getImageUrl(post.image)} 
            alt={post.title}
            style={{ 
              width: '100%', 
              height: '200px', 
              objectFit: 'cover',
              borderRadius: '0'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="post-content">
        <div className="post-excerpt">
          {truncateContent(post.content)}
        </div>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Read More
        </Link>
      </div>

      <div className="post-actions">
        <div className="post-stats">
          <button 
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={loading}
          >
            <i className={`fas fa-heart ${liked ? 'text-danger' : ''}`}></i>
            <span>{likesCount}</span>
          </button>
          <span className="comment-count">
            <i className="fas fa-comment"></i>
            <span>{post.commentsCount || 0}</span>
          </span>
        </div>

        {canEditDelete && (
          <div className="post-controls">
            <Link 
              to={`/edit-post/${post._id}`} 
              className="btn btn-secondary"
              style={{ marginRight: '10px' }}
            >
              <i className="fas fa-edit"></i> Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="btn btn-danger"
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
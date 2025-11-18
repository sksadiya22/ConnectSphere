import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { API_BASE_URL } from '../../config';

const CommentSection = ({ postId }) => {
  const { isAuthenticated } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async (page = 1) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/comments/post/${postId}?page=${page}`);
      setComments(res.data.comments);
      setPagination(res.data.pagination);
    } catch (error) {
      toast.error('Error loading comments');
    }
    setLoading(false);
  };

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
  };

  const handleCommentDeleted = (commentId) => {
    setComments(comments.filter(comment => comment._id !== commentId));
  };

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Loading comments...
      </div>
    );
  }

  return (
    <div className="comments-section">
      <h3>
        <i className="fas fa-comments"></i> Comments ({pagination.total || 0})
      </h3>

      {isAuthenticated ? (
        <CommentForm 
          postId={postId} 
          onCommentAdded={handleCommentAdded}
        />
      ) : (
        <div className="comment-login-prompt">
          <p>Please <a href="/login">login</a> to leave a comment.</p>
        </div>
      )}

      <CommentList 
        comments={comments}
        onCommentDeleted={handleCommentDeleted}
        postId={postId}
      />

      {pagination.pages > 1 && (
        <div className="pagination">
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => fetchComments(page)}
              className={pagination.current === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
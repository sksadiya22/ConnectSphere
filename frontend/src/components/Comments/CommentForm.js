import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';

const CommentForm = ({ postId, parentCommentId, onCommentAdded, onCancel }) => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error('Comment content is required');
      return;
    }

    setLoading(true);

    try {
      const commentData = {
        content: content.trim(),
        postId,
        parentCommentId
      };

      const res = await axios.post(`${API_BASE_URL}/api/comments`, commentData);
      toast.success('Comment added successfully!');
      setContent('');
      if (onCommentAdded) {
        onCommentAdded(res.data.comment);
      }
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding comment');
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className="comment-form">
      <div className="form-group">
        <label htmlFor="content">
          {parentCommentId ? 'Reply to comment:' : 'Add a comment:'}
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-control"
          placeholder="Write your comment here..."
          rows="3"
          required
        ></textarea>
      </div>

      <div className="form-group">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          style={{ marginRight: '10px' }}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Posting...
            </>
          ) : (
            <>
              <i className="fas fa-comment"></i> {parentCommentId ? 'Reply' : 'Post Comment'}
            </>
          )}
        </button>
        
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CommentForm;
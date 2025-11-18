import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import CommentForm from './CommentForm';
import { API_BASE_URL } from '../../config';

const CommentItem = ({ comment, onCommentDeleted, postId, level = 0 }) => {
  const { user } = useAuth();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState(comment.replies || []);

  const canDelete = user && (user.id === comment.author._id || user.role === 'admin');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/comments/${comment._id}`);
        toast.success('Comment deleted successfully');
        onCommentDeleted(comment._id);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error deleting comment');
      }
    }
  };

  const handleReplyAdded = (newReply) => {
    setReplies([...replies, newReply]);
    setShowReplyForm(false);
  };

  const handleReplyDeleted = (replyId) => {
    setReplies(replies.filter(reply => reply._id !== replyId));
  };

  return (
    <div className="comment" style={{ marginLeft: `${level * 20}px` }}>
      <div className="comment-header">
        <div className="comment-author">
          <i className="fas fa-user"></i>
          <strong>{comment.author.username}</strong>
        </div>
        <div className="comment-actions">
          <span className="comment-date">
            {moment(comment.createdAt).fromNow()}
          </span>
          {user && level < 2 && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="btn-link"
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#007bff', 
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              <i className="fas fa-reply"></i> Reply
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="btn-link"
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#dc3545', 
                cursor: 'pointer',
                marginLeft: '10px'
              }}
            >
              <i className="fas fa-trash"></i> Delete
            </button>
          )}
        </div>
      </div>
      
      <div className="comment-content">
        {comment.content}
      </div>

      {showReplyForm && (
        <div style={{ marginTop: '15px' }}>
          <CommentForm
            postId={postId}
            parentCommentId={comment._id}
            onCommentAdded={handleReplyAdded}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {replies.length > 0 && (
        <div className="comment-replies" style={{ marginTop: '15px' }}>
          {replies.map(reply => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onCommentDeleted={handleReplyDeleted}
              postId={postId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList = ({ comments, onCommentDeleted, postId }) => {
  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <p>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map(comment => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onCommentDeleted={onCommentDeleted}
          postId={postId}
        />
      ))}
    </div>
  );
};

export default CommentList;
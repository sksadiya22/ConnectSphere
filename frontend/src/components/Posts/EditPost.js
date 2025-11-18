import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getImageUrl } from '../../utils/imageUtils';
import { API_BASE_URL } from '../../config';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    tags: '',
    status: 'published'
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
      const post = res.data;
      
      // Check if user can edit this post
      if (post.author._id !== user?.id && user?.role !== 'admin') {
        toast.error('You are not authorized to edit this post');
        navigate('/');
        return;
      }

      setFormData({
        title: post.title,
        content: post.content,
        image: post.image || '',
        tags: post.tags ? post.tags.join(', ') : '',
        status: post.status
      });
    } catch (error) {
      toast.error('Post not found');
      navigate('/');
    }
    setLoading(false);
  };

  const { title, content, image, tags, status } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Auto-upload the image immediately
      setUploadingImage(true);
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      try {
        const res = await axios.post(`${API_BASE_URL}/api/posts/upload-image`, formDataUpload, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Automatically update the image URL field
        const uploadedImageUrl = res.data.imageUrl;
        setFormData({ ...formData, image: uploadedImageUrl });
        
        setUploadingImage(false);
        toast.success('Image uploaded successfully!');
      } catch (error) {
        setUploadingImage(false);
        toast.error('Error uploading image');
      }
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return '';

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', imageFile);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/posts/upload-image`, formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadingImage(false);
      return res.data.imageUrl;
    } catch (error) {
      setUploadingImage(false);
      toast.error('Error uploading image');
      return '';
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setSubmitting(true);

    try {
      const postData = {
        title: title.trim(),
        content: content.trim(),
        image: image.trim(), // Image URL is already set from upload or manual entry
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        status
      };

      await axios.put(`${API_BASE_URL}/api/posts/${id}`, postData);
      toast.success('Post updated successfully!');
      navigate(`/post/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error updating post');
    }
    
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <i className="fas fa-spinner fa-spin"></i> Loading post...
      </div>
    );
  }

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="post-form">
        <h2 className="form-title">
          <i className="fas fa-edit"></i> Edit Post
        </h2>
        
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={onChange}
            className="form-control"
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={onChange}
            className="form-control"
            placeholder="Write your post content here..."
            rows="10"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          
          {/* File Upload */}
          <div className="image-upload-section">
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={onImageChange}
              className="form-control"
              style={{ marginBottom: '10px' }}
            />
            <small className="text-muted">Upload a new image file (max 5MB)</small>
          </div>

          {/* OR separator */}
          <div className="upload-separator" style={{ textAlign: 'center', margin: '15px 0', color: '#666' }}>
            OR
          </div>

          {/* URL Input */}
          <div className="image-url-section">
            <input
              type="url"
              id="image"
              name="image"
              value={image}
              onChange={onChange}
              className="form-control"
              placeholder="https://example.com/image.jpg"
            />
            <small className="text-muted">Enter image URL</small>
          </div>

          {/* Image Preview */}
          {(imagePreview || image) && (
            <div className="image-preview" style={{ marginTop: '15px' }}>
              <img 
                src={imagePreview || getImageUrl(image)} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px', 
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
                onError={(e) => {
                  console.log('Image failed to load:', e.target.src);
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('');
                  setFormData({ ...formData, image: '' });
                }}
                className="btn btn-danger"
                style={{ marginTop: '10px', padding: '5px 10px', fontSize: '12px' }}
              >
                <i className="fas fa-times"></i> Remove Image
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (optional)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={onChange}
            className="form-control"
            placeholder="javascript, react, nodejs (comma separated)"
          />
          <small className="text-muted">
            Separate tags with commas
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={onChange}
            className="form-control"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="form-group">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={submitting || uploadingImage}
            style={{ marginRight: '10px' }}
          >
            {submitting || uploadingImage ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> 
                {uploadingImage ? 'Uploading...' : 'Updating...'}
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> Update Post
              </>
            )}
          </button>
          
          <button 
            type="button" 
            onClick={() => navigate(`/post/${id}`)}
            className="btn btn-secondary"
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
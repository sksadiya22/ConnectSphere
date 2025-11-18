// Helper function to get the correct image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL (starts with http), return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the backend URL
  if (imagePath.startsWith('/uploads/')) {
    return `http://localhost:8080${imagePath}`;
  }
  
  // If it's just a filename, construct the full path
  if (!imagePath.includes('/')) {
    return `http://localhost:8080/uploads/posts/${imagePath}`;
  }
  
  return imagePath;
};
# MERN Blog Application - Complete Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the complete MERN stack blog application.

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Backend Setup

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Your `.env` file is already configured with:
   ```
   PORT=3001
   MONGODB_URI=mongodb+srv://niharikar:nikky@cluster0.obc1j6z.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=mern_blog_jwt_secret_key_2024_super_secure_random_string_for_production
   NODE_ENV=development
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   The backend will run on `http://localhost:3001`

### 2. Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm start
   ```
   
   The frontend will run on `http://localhost:3000`

### 3. Testing the Application

1. **Open your browser** and go to `http://localhost:3000`

2. **Register a new account:**
   - Click "Register" in the navigation
   - Fill in username, email, and password
   - Submit the form

3. **Create your first post:**
   - After registration, click "Create Post"
   - Add title, content, and optional image/tags
   - Publish the post

4. **Test all features:**
   - Like/unlike posts
   - Add comments and replies
   - Edit/delete your own posts
   - View your profile

## 📁 Project Structure

```
mern-blog/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication middleware
│   ├── config/          # Database configuration
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
└── setup.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (auth required)
- `PUT /api/posts/:id` - Update post (author only)
- `DELETE /api/posts/:id` - Delete post (author only)
- `POST /api/posts/:id/like` - Like/unlike post (auth required)

### Comments
- `GET /api/comments/post/:postId` - Get comments for post
- `POST /api/comments` - Create comment (auth required)
- `PUT /api/comments/:id` - Update comment (author only)
- `DELETE /api/comments/:id` - Delete comment (author only)

### Admin (Optional)
- `GET /api/admin/stats` - Get dashboard stats (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/posts` - Get all posts including drafts (admin only)

## 🎯 Features Implemented

### ✅ Core Features
- [x] User registration and authentication (JWT)
- [x] Password hashing with bcrypt
- [x] Create, read, update, delete posts
- [x] Author-only permissions for post management
- [x] Comment system with nested replies
- [x] Like/unlike posts functionality
- [x] User profiles and statistics
- [x] Responsive design for all devices
- [x] Real-time notifications
- [x] Pagination for posts and comments
- [x] Admin dashboard and user management

### ✅ Security Features
- [x] JWT token authentication
- [x] Password hashing
- [x] Input validation and sanitization
- [x] Protected routes
- [x] Role-based access control
- [x] CORS configuration

### ✅ UI/UX Features
- [x] Modern, responsive design
- [x] Loading states and error handling
- [x] Toast notifications
- [x] Smooth animations
- [x] Mobile-friendly interface
- [x] Font Awesome icons
- [x] Gradient design theme

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use:**
   - Change the PORT in `.env` file
   - Kill existing processes: `npx kill-port 3001`

2. **MongoDB connection issues:**
   - Check your internet connection
   - Verify MongoDB Atlas credentials
   - Ensure IP whitelist includes your IP

3. **Frontend not connecting to backend:**
   - Ensure backend is running on port 3001
   - Check proxy configuration in frontend/package.json

4. **Authentication issues:**
   - Clear browser localStorage
   - Check JWT_SECRET in .env file
   - Verify token expiration

### Development Tips

1. **Hot Reload:**
   - Backend uses nodemon for auto-restart
   - Frontend uses React's built-in hot reload

2. **Debugging:**
   - Check browser console for frontend errors
   - Check terminal for backend errors
   - Use React Developer Tools

3. **Database Management:**
   - Use MongoDB Compass for GUI
   - Check MongoDB Atlas dashboard for metrics

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Create production build
2. Set environment variables
3. Deploy to hosting service

### Frontend Deployment (Netlify/Vercel)
1. Run `npm run build` in frontend directory
2. Deploy build folder
3. Configure API base URL for production

## 📝 Next Steps

1. **Add more features:**
   - User avatars and profiles
   - Post categories
   - Search functionality
   - Email notifications
   - Rich text editor

2. **Improve performance:**
   - Image optimization
   - Caching strategies
   - Database indexing
   - Code splitting

3. **Add testing:**
   - Unit tests for components
   - Integration tests for API
   - End-to-end testing

## 🎉 Congratulations!

You now have a fully functional MERN stack blog application with:
- Complete user authentication
- Full CRUD operations for posts
- Interactive comment system
- Like functionality
- Admin features
- Modern, responsive UI

Happy coding! 🚀
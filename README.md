# Lifescroll - MERN Stack Blog Application

## 🌐 Live Demo

🚀 **Live Link of the Life Scroll:**  
[https://lifescroll-3.onrender.com/](https://lifescroll-3.onrender.com/)


A complete full-stack blog application built with MongoDB, Express.js, React, and Node.js (MERN Stack).

## Features

- **User Authentication**: JWT-based authentication with register, login, and profile management
- **Post Management**: Full CRUD operations for blog posts with image upload
- **Comment System**: Nested comments with replies functionality
- **Like System**: Users can like/unlike posts
- **Image Upload**: Automatic image upload and preview for posts
- **Responsive Design**: Modern, mobile-friendly UI
- **Real-time Updates**: Dynamic content updates
- **Security**: Password hashing, JWT tokens, input validation

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Multer for file uploads

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- React Toastify for notifications
- React Quill for rich text editing
- Moment.js for date formatting

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sksadiya22/lifescroll.git
   cd lifescroll
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   Backend will run on http://localhost:5001

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   Frontend will run on http://localhost:3003

### Quick Start (Both servers)

1. **Terminal 1** (Backend):
   ```bash
   npm start
   ```

2. **Terminal 2** (Frontend):
   ```bash
   cd frontend
   npm start
   ```

Your application will be available at:
- **Frontend**: http://localhost:3003
- **Backend API**: http://localhost:5001

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Posts
- `GET /api/posts` - Get all posts (with pagination)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create new post (Protected)
- `PUT /api/posts/:id` - Update post (Author only)
- `DELETE /api/posts/:id` - Delete post (Author only)
- `POST /api/posts/:id/like` - Like/Unlike post (Protected)
- `GET /api/posts/user/:userId` - Get posts by user

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments` - Create new comment (Protected)
- `PUT /api/comments/:id` - Update comment (Author only)
- `DELETE /api/comments/:id` - Delete comment (Author only)

## Usage Examples

### Register a new user
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create a new post
```bash
curl -X POST http://localhost:5000/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "tags": ["javascript", "nodejs"]
  }'
```

## Project Structure

```
lifescroll/
├── backend/                 # Backend API (Alternative structure)
├── frontend/               # React frontend application
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Auth/       # Login, Register components
│   │   │   ├── Posts/      # Post-related components
│   │   │   ├── Comments/   # Comment components
│   │   │   ├── Layout/     # Navigation, Layout components
│   │   │   └── Pages/      # Home, Profile pages
│   │   ├── context/        # React Context (Auth)
│   │   ├── utils/          # Utility functions
│   │   └── App.js          # Main App component
│   └── package.json
├── models/                 # MongoDB models
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes/                 # Express routes
│   ├── auth.js
│   ├── posts.js
│   ├── comments.js
│   └── admin.js
├── middleware/             # Express middleware
│   ├── auth.js
│   └── upload.js
├── uploads/                # Uploaded images
├── server.js               # Main server file
├── .env                    # Environment variables
└── README.md
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected routes with middleware
- Role-based access control (Admin/User)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

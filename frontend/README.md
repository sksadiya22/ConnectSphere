# MERN Blog Frontend

A modern, responsive React frontend for the MERN Stack Blog Application.

## Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **User Authentication**: Login, register, and profile management
- **Post Management**: Create, edit, delete, and view blog posts
- **Interactive Comments**: Nested comments with replies
- **Like System**: Like and unlike posts
- **Real-time Updates**: Instant feedback with toast notifications
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Pagination**: Efficient loading of posts and comments

## Tech Stack

- React 18
- React Router DOM v6
- Axios for API calls
- React Toastify for notifications
- Moment.js for date formatting
- Font Awesome for icons
- CSS3 with modern features

## Installation & Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── Comments/
│   │   │   ├── CommentSection.js
│   │   │   ├── CommentForm.js
│   │   │   └── CommentList.js
│   │   ├── Layout/
│   │   │   ├── Navbar.js
│   │   │   └── PrivateRoute.js
│   │   ├── Pages/
│   │   │   ├── Home.js
│   │   │   └── Profile.js
│   │   └── Posts/
│   │       ├── PostCard.js
│   │       ├── CreatePost.js
│   │       ├── PostDetail.js
│   │       └── EditPost.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Key Features

### Authentication
- JWT-based authentication
- Protected routes
- Persistent login state
- User profile management

### Posts
- Rich text content
- Image support
- Tags system
- Like/unlike functionality
- Author permissions (edit/delete own posts)
- Admin permissions (manage all posts)

### Comments
- Nested comment system
- Real-time comment count
- Reply to comments
- Delete own comments
- Admin can delete any comment

### UI/UX
- Responsive design for all screen sizes
- Loading states and error handling
- Toast notifications for user feedback
- Smooth animations and transitions
- Modern gradient design
- Font Awesome icons

## API Integration

The frontend communicates with the backend API running on `http://localhost:3001` through:

- Axios HTTP client
- JWT token authentication
- Error handling and user feedback
- Automatic token refresh

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## Environment Configuration

The app uses a proxy configuration in `package.json` to connect to the backend:

```json
"proxy": "http://localhost:3001"
```

This allows the frontend to make API calls to `/api/*` routes without CORS issues.

## Deployment

To deploy the frontend:

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `build` folder contains the optimized production files
3. Deploy to your preferred hosting service (Netlify, Vercel, etc.)
4. Update the API base URL for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers
# BlogHub Frontend

A modern React.js frontend for BlogHub - A Simple Blogging Platform with user authentication and blog management features.

## 🚀 Features

- **User Authentication**: Register, login, and logout functionality
- **Blog Management**: Create, read, update, and delete blog posts
- **User Profile**: View personal profile and authored posts
- **Responsive Design**: Mobile-friendly interface
- **Protected Routes**: Route protection based on authentication
- **Real-time Feedback**: Loading states and error handling
- **Modern UI**: Clean and intuitive user interface

## 🛠️ Tech Stack

- **Frontend Framework**: React.js (v18+)
- **Hooks**: useState, useEffect
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **State Management**: Redux 
- **Form Handling**: Controlled components
- **Authentication**: JWT token storage and management

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Running BlogHub Backend API

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone <https://github.com/anandanpm/blog_hub_backend>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# API Configuration
REACT_APP_API_URL=https://blog-hub-backend.onrender.com/api

# App Configuration
REACT_APP_NAME=BlogHub
REACT_APP_VERSION=1.0.0
```

### 4. Start the development server
```bash
npm start
```

The application will open at `http://localhost:3000`

## 🔗 Available Scripts

```bash
# Start development server
npm start
```

## 🎨 Component Architecture

### Authentication Components

#### LoginForm.js
```jsx
// Handles user login with email and password
// Features: Form validation, loading states, error handling
```

#### RegisterForm.js
```jsx
// Handles user registration
// Features: Input validation, password confirmation, error display
```

### Blog Components

#### BlogCard.js
```jsx
// Displays blog preview in list view
// Features: Title, excerpt, author, date, 
```

#### BlogForm.js
```jsx
// Reusable form for creating and editing blogs
// Features: Title and content inputs, validation, submit handling
```

#### BlogList.js
```jsx
// Displays list of all blog posts

```

## 🔐 Authentication Flow

### Protected Routes
```jsx
// Route protection based on authentication status
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## 🌐 API Integration

### Service Layer Structure

#### authService.js
```javascript
// Authentication API calls
export const authService = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get('/auth/me')
};
```

#### blogService.js
```javascript
// Blog API calls
export const blogService = {
  getAllBlogs: () => api.get('/blogs'),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  createBlog: (blogData) => api.post('/blogs', blogData),
  updateBlog: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id) => api.delete(`/blogs/${id}`)
};
```

## 🚀 Build and Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

```

#### GitHub Pages
```bash
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

## 🔧 Environment Variables

### Development (.env)
```env
REACT_APP_API_URL='https://blog-hub-backend.onrender.com/api'
```

## 🆘 Support

For support, please email: kiran@sinope.co.in, luvraj@sinope.co.in

---

**Happy Coding! 🚀**

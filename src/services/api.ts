import axios from 'axios';
import { RegisterData, LoginData, CreateBlogData, UpdateBlogData } from '../types';
import { getCookie } from '../utils/cookies';

// Handle environment variable properly
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor to add token from cookies
api.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear cookies and redirect to login
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData: RegisterData) => api.post('/auth/register', userData),
  login: (userData: LoginData) => api.post('/auth/login', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/me'),
};

// Blog API calls
export const blogAPI = {
  getAllBlogs: () => api.get('/blogs'),
  getBlogById: (id: string) => api.get(`/blogs/${id}`),
  createBlog: (blogData: CreateBlogData) => api.post('/blogs', blogData),
  updateBlog: (id: string, blogData: UpdateBlogData) => api.put(`/blogs/${id}`, blogData),
  deleteBlog: (id: string) => api.delete(`/blogs/${id}`),
};

export default api;

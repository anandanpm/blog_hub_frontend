import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from './hooks/redux';
import { checkAuthStatus } from './store/slices/authSlice';

// Components
import Layout from './components/Layout/Layout';
import BlogList from './components/Blog/BlogList';
import BlogDetail from './components/Blog/BlogDetail';
import BlogForm from './components/Blog/BlogForm';
import EditBlog from './components/Blog/EditBlog';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import ProtectedRoute from './components/Auth/ProtectedRoute';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <BlogForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getUserProfile } from '../../store/slices/authSlice';
import { fetchAllBlogs } from '../../store/slices/blogSlice';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import BlogCard from '../Blog/BlogCard';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading: authLoading, error: authError } = useAppSelector((state) => state.auth);
  const { blogs, isLoading: blogsLoading } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const userBlogs = blogs.filter(blog => {
    const authorId = typeof blog.author === 'string' ? blog.author : blog.author._id;
    return user && authorId === user._id;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getJoinedDaysAgo = () => {
    if (!user?.createdAt) return 0;
    const joinDate = new Date(user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (authLoading || blogsLoading) return <Loading />;

  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
            <ErrorMessage message={authError} />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-6 sm:p-8 text-center">
            <div className="mb-6 sm:mb-8">
              <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
                <svg className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Authentication Required</h2>
              <p className="text-sm sm:text-base text-gray-600">Please log in to view your profile and manage your blog posts.</p>
            </div>
            <Link 
              to="/login" 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 overflow-hidden mb-6 sm:mb-8">
          {/* Hero Section - Mobile optimized */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 text-white relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-center sm:justify-between">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-4 sm:mb-0">
                  <div className="w-20 h-20 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border border-white/30">
                    <span className="text-2xl sm:text-xl lg:text-3xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 truncate">
                      {user.name}
                    </h1>
                    <p className="text-blue-100 text-sm sm:text-base lg:text-lg flex items-center justify-center sm:justify-start space-x-2 mb-1">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span className="truncate">{user.email}</span>
                    </p>
                    <p className="text-blue-100 text-xs sm:text-sm flex items-center justify-center sm:justify-start space-x-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Member since {formatDate(user.createdAt)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Mobile grid optimized */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-blue-600">Total Posts</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900">{userBlogs.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-purple-600">Days Active</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-900">{getJoinedDaysAgo()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-green-600">Status</p>
                    <p className="text-sm sm:text-base lg:text-lg font-bold text-green-900">Active</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-center sm:text-left min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-orange-600">Avg. Words</p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-900">
                      {userBlogs.length > 0 
                        ? Math.round(userBlogs.reduce((acc, blog) => acc + blog.content.split(' ').length, 0) / userBlogs.length)
                        : 0
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">My Blog Posts</h2>
              <p className="text-sm sm:text-base text-gray-600">Manage and view all your published content</p>
            </div>
            {userBlogs.length > 0 && (
              <Link
                to="/create"
                className="inline-flex sm:hidden lg:inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Create New Post</span>
                <span className="sm:hidden">New Post</span>
              </Link>
            )}
          </div>
          
          {userBlogs.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <div className="mx-auto h-20 w-20 sm:h-24 sm:w-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-6 sm:mb-8 shadow-lg">
                <svg className="h-10 w-10 sm:h-12 sm:w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No Blog Posts Yet</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Start sharing your thoughts and ideas with the world. Create your first blog post to get started!
              </p>
              <Link
                to="/create"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Your First Post</span>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {userBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>

        {/* Mobile FAB for creating posts */}
        {userBlogs.length > 0 && (
          <Link
            to="/create"
            className="fixed bottom-6 right-6 sm:hidden w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 transform hover:scale-110 z-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Profile;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchBlogById, deleteBlog, clearCurrentBlog } from '../../store/slices/blogSlice';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';
import { User } from '../../types';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const { currentBlog, isLoading, error } = useAppSelector((state) => state.blogs);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
    
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (id) {
      await dispatch(deleteBlog(id));
      navigate('/');
    }
    setShowDeleteModal(false);
  };

  const confirmDelete = () => {
    setShowDeleteModal(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAuthorInfo = () => {
    if (!currentBlog) return { name: 'Unknown', id: '' };
    
    if (typeof currentBlog.author === 'string') {
      return { name: 'Unknown Author', id: currentBlog.author };
    }
    return { 
      name: (currentBlog.author as User).name, 
      id: (currentBlog.author as User)._id 
    };
  };

  const isAuthor = () => {
    if (!user || !currentBlog) return false;
    const authorId = typeof currentBlog.author === 'string' 
      ? currentBlog.author 
      : currentBlog.author._id;
    return user._id === authorId;
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <ErrorMessage message={error} />
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 mt-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 text-center">
            <div className="mb-8">
              <div className="mx-auto h-20 w-20 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.691c-2.598-2.11-4.126-5.3-4-8.737.059-1.614.485-3.24 1.442-4.711" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Post Not Found</h2>
              <p className="text-gray-600">The blog post you're looking for doesn't exist or has been removed.</p>
            </div>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const authorInfo = getAuthorInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Posts</span>
          </Link>
        </div>

        {/* Main Content */}
        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                {currentBlog.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg font-semibold">
                      {authorInfo.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{authorInfo.name}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-blue-100">
                      <p className="text-sm flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Published {formatDate(currentBlog.createdAt)}</span>
                      </p>
                      {currentBlog.updatedAt !== currentBlog.createdAt && (
                        <p className="text-sm flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Updated {formatDate(currentBlog.updatedAt)}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isAuthor() && (
                  <div className="flex space-x-3">
                    <Link
                      to={`/edit/${currentBlog._id}`}
                      className="inline-flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </Link>
                    <button
                      onClick={confirmDelete}
                      className="inline-flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap font-light tracking-wide">
                {currentBlog.content}
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>Article</span>
                </span>
                <span className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{Math.ceil(currentBlog.content.split(' ').length / 200)} min read</span>
                </span>
              </div>
            </div>
          </div>
        </article>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 max-w-md w-full transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Delete Blog Post</h3>
                    <p className="text-sm text-gray-600">This action cannot be undone</p>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete <span className="font-semibold">"{currentBlog?.title}"</span>? 
                  This will permanently remove the blog post and all its content.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="w-full sm:w-auto px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-all duration-200 border border-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
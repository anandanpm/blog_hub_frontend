import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createBlog } from '../../store/slices/blogSlice';
import ErrorMessage from '../Common/ErrorMessage';
import SuccessMessage from '../Common/SuccessMessage';
import Loading from '../Common/Loading';

const BlogForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const { isLoading, error } = useAppSelector((state) => state.blogs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'content') {
      setCharCount(value.length);
      setWordCount(value.trim() ? value.trim().split(/\s+/).length : 0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    const result = await dispatch(createBlog(formData));
    
    if (createBlog.fulfilled.match(result)) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header - Responsive adjustments */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-sm sm:text-base text-gray-600">Share your thoughts with the world</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="p-4 sm:p-6 lg:p-8">
            {showSuccess && (
              <div className="mb-4 sm:mb-6">
                <SuccessMessage
                  message="Blog post created successfully! Redirecting..."
                  onClose={() => setShowSuccess(false)}
                />
              </div>
            )}

            {error && (
              <div className="mb-4 sm:mb-6">
                <ErrorMessage message={error} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Title Field - Responsive improvements */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                  Post Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter an engaging title..."
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 text-base sm:text-lg border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Field - Mobile optimized */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                  <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                    Content
                  </label>
                  <div className="flex space-x-3 sm:space-x-4 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{wordCount} words</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-md">{charCount} chars</span>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={12} // Reduced for mobile
                    placeholder="Tell your story... What's on your mind?"
                    className="w-full px-3 py-3 sm:px-4 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 bg-gray-50 focus:bg-white placeholder-gray-400 leading-relaxed text-sm sm:text-base"
                    style={{ minHeight: '280px' }} // Ensure minimum height on mobile
                  />
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 pointer-events-none">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Improved mobile layout */}
              <div className="flex flex-col gap-3 pt-4 sm:pt-6">
                <button
                  type="submit"
                  disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm sm:text-base"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Publish Post
                    </div>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-100 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                >
                  <div className="flex items-center justify-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tips Section - Mobile optimized */}
        <div className="mt-6 sm:mt-8 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">✨ Writing Tips</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <div className="flex items-start space-x-2 p-2 sm:p-0">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>Start with a compelling hook</span>
            </div>
            <div className="flex items-start space-x-2 p-2 sm:p-0">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>Use clear, concise paragraphs</span>
            </div>
            <div className="flex items-start space-x-2 p-2 sm:p-0 sm:col-span-2 lg:col-span-1">
              <div className="w-2 h-2 bg-pink-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span>Include personal insights</span>
            </div>
          </div>
        </div>

        {/* Mobile-specific helper text */}
        <div className="mt-4 text-center sm:hidden">
          <p className="text-xs text-gray-500 bg-white/50 rounded-lg px-3 py-2">
            💡 Tip: Turn your device to landscape mode for a better writing experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
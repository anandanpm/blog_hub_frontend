import React from 'react';
import { Link } from 'react-router-dom';
import { Blog, User } from '../../types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getAuthorName = () => {
    if (typeof blog.author === 'string') {
      return 'Unknown Author';
    }
    return (blog.author as User).name;
  };

  const getAuthorInitials = () => {
    const name = getAuthorName();
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const truncateContent = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-1">
      {/* Header with gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 line-clamp-2">
          <Link
            to={`/blog/${blog._id}`}
            className="text-gray-800 hover:text-blue-600 transition-colors duration-200 group-hover:text-blue-600"
          >
            {blog.title}
          </Link>
        </h3>
        
        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {truncateContent(blog.content)}
        </p>
        
        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Author Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {getAuthorInitials()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">{getAuthorName()}</span>
              <span className="text-xs text-gray-500">{formatDate(blog.createdAt)}</span>
            </div>
          </div>
          
          {/* Read More Button */}
          <Link
            to={`/blog/${blog._id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0"
          >
            <span>Read</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Bottom border animation */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
    </div>
  );
};

export default BlogCard;
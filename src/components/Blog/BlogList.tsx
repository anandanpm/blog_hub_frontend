import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchAllBlogs } from '../../store/slices/blogSlice';
import BlogCard from './BlogCard';
import Loading from '../Common/Loading';
import ErrorMessage from '../Common/ErrorMessage';

const BlogList: React.FC = () => {
  const { blogs, isLoading, error } = useAppSelector((state) => state.blogs);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Latest Blog Posts</h1>
        {isAuthenticated && (
          <Link
            to="/create"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create New Post
          </Link>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {blogs.length === 0 && !isLoading ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No blog posts found.</p>
          <p className="text-gray-500 mt-2">Be the first to create one!</p>
          {isAuthenticated && (
            <Link
              to="/create"
              className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Your First Post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;

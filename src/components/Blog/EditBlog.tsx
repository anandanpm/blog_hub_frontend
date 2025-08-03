
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchBlogById, updateBlog, clearCurrentBlog } from '../../store/slices/blogSlice';
import ErrorMessage from '../Common/ErrorMessage';
import SuccessMessage from '../Common/SuccessMessage';
import Loading from '../Common/Loading';


const EditBlog: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

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

  useEffect(() => {
    if (currentBlog) {
      // Check if user is the author
      const authorId = typeof currentBlog.author === 'string' 
        ? currentBlog.author 
        : currentBlog.author._id;
      
      if (!user || user._id !== authorId) {
        navigate('/');
        return;
      }

      setFormData({
        title: currentBlog.title,
        content: currentBlog.content,
      });
    }
  }, [currentBlog, user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !id) {
      return;
    }

    const result = await dispatch(updateBlog({ id, blogData: formData }));
    
    if (updateBlog.fulfilled.match(result)) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate(`/blog/${id}`);
      }, 2000);
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-600 text-lg">Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog Post</h1>

        {showSuccess && (
          <SuccessMessage
            message="Blog post updated successfully! Redirecting..."
            onClose={() => setShowSuccess(false)}
          />
        )}

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={15}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading || !formData.title.trim() || !formData.content.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Post'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;


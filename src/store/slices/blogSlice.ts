import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BlogState, Blog, CreateBlogData, UpdateBlogData } from '../../types';
import { blogAPI } from '../../services/api';

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getAllBlogs();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getBlogById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog');
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData: CreateBlogData, { rejectWithValue }) => {
    try {
      const response = await blogAPI.createBlog(blogData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create blog');
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/update',
  async ({ id, blogData }: { id: string; blogData: UpdateBlogData }, { rejectWithValue }) => {
    try {
      const response = await blogAPI.updateBlog(id, blogData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update blog');
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await blogAPI.deleteBlog(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
    }
  }
);

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchAllBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedBlog = action.payload;
        const index = state.blogs.findIndex(blog => blog._id === updatedBlog._id);
        if (index !== -1) {
          state.blogs[index] = updatedBlog;
        }
        state.currentBlog = updatedBlog;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        if (state.currentBlog?._id === action.payload) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearBlogError, clearCurrentBlog } = blogSlice.actions;
export default blogSlice.reducer;

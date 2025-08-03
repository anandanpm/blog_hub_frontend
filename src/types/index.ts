export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string | User;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface BlogState {
  blogs: Blog[];
  currentBlog: Blog | null;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateBlogData {
  title: string;
  content: string;
}

export interface UpdateBlogData {
  title: string;
  content: string;
}
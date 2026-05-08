import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // First, try to restore from localStorage
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }

      // Then verify with server (using cookie or localStorage token)
      const headers: HeadersInit = {
        'Content-Type': 'application/json'
      };
      
      // If we have a token in localStorage, send it as Bearer token
      if (storedToken) {
        headers['Authorization'] = `Bearer ${storedToken}`;
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        credentials: 'include', // Include cookies
        headers
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setToken(storedToken || 'authenticated');
        // Update localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        // If server says not authenticated, clear everything
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Authentication check failed';
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        errorMessage = 'Cannot connect to server. Please check if the backend is running.';
      } else if (error instanceof Error) {
        errorMessage = `Authentication error: ${error.message}`;
      }
      
      // Show error to user (you can implement a toast system here)
      console.warn(errorMessage);
      
      // On network error, keep localStorage user if exists
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (!storedUser || !storedToken) {
        setUser(null);
        setToken(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store user info and token
      setUser(data.user);
      setToken(data.token);
      
      // Store in localStorage as backup
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login error:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Cannot connect to server. Please check if the backend is running on port 5001.');
      } else if (error instanceof Error) {
        throw error; // Re-throw the original error with server message
      } else {
        throw new Error('An unexpected error occurred during login');
      }
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include' // Include cookies
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state regardless of API response
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token && !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if token exists in localStorage on startup
  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem('jkWebSolutionsUser');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          // Fetch freshest user state from backend
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${parsed.token}`
            }
          });

          if (res.ok) {
            const freshData = await res.json();
            const updatedUser = { ...freshData, token: parsed.token };
            setUser(updatedUser);
            localStorage.setItem('jkWebSolutionsUser', JSON.stringify(updatedUser));
          } else {
            // Token expired or invalid
            localStorage.removeItem('jkWebSolutionsUser');
            setUser(null);
          }
        } catch (error) {
          console.error('Auth initialization error', error);
          localStorage.removeItem('jkWebSolutionsUser');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password, isAdmin = false) => {
    setLoading(true);
    try {
      const url = isAdmin ? '/api/auth/admin/login' : '/api/auth/login';
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data);
      localStorage.setItem('jkWebSolutionsUser', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (name, email, password, phone, restaurantName) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, phone, restaurantName })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data);
      localStorage.setItem('jkWebSolutionsUser', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    if (!user) return;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(profileData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Update profile failed');
      }

      const updated = { ...data, token: user.token };
      setUser(updated);
      localStorage.setItem('jkWebSolutionsUser', JSON.stringify(updated));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('jkWebSolutionsUser');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    updateProfile,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

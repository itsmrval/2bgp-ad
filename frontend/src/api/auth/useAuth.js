import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from "../../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wgState, setWgState] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedWgState = localStorage.getItem('wg_state');
  
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedWgState !== null) {
      setWgState(storedWgState === "true" || storedWgState === true);
    }
  
    setLoading(false);
  }, []);
  

  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
    window.dispatchEvent(new Event('localStorageChange'));
  };

  // Register function
  const register = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { username, password });
      updateLocalStorage('token', response.data.token);
      updateLocalStorage('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  // Login function
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      updateLocalStorage('token', response.data.token);
      updateLocalStorage('user', JSON.stringify(response.data.user));
      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('wg_state');
    window.dispatchEvent(new Event('localStorageChange'));
    setUser(null);
    setWgState(null);
  };

  // WG retrieve
  const getProfile = async () => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/${user.id}/wg`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data
    } catch (err) {
      setError(err.response?.data?.error || 'Profile retrieve fail');
      throw err;
    }
  }

  // Scoreboard retrieve
  const getPoints = async () => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/points`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data
    } catch (err) {
      setError(err.response?.data?.error || 'Points retrieve fail');
      throw err;
    }
  }

  useEffect(() => {
    let interval;
    const fetchWgState = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const newWgState = response.data.wg_state;
        if (newWgState !== wgState) {
          setWgState(newWgState);
          updateLocalStorage('wg_state', newWgState);
        }
      } catch (err) {
        console.error('Error fetching wg_state:', err);
      }
    };

    if (user) {
      fetchWgState();
      interval = setInterval(fetchWgState, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user, wgState]);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      wgState,
      register,
      login,
      logout,
      getProfile,
      getPoints
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

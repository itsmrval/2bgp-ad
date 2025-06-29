import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_URL } from "../../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ovpnState, setOvpnState] = useState(null);
  const [vmsState, setVmsState] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedOvpnState = localStorage.getItem('ovpn_state');
    const storedVmsState = localStorage.getItem('vms_state');
  
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedOvpnState !== null) {
      setOvpnState(storedOvpnState === "true" || storedOvpnState === true);
    }
    if (storedVmsState !== null) {
      setVmsState(storedVmsState === "true" || storedVmsState === true);
    }
  
    setLoading(false);
    
    const handleLocalStorageChange = () => {
      const devModeChanged = localStorage.getItem('dev') === "true";
      if (devModeChanged !== (localStorage.getItem('dev') === "true")) {
        setLoading(loading => !loading);
      }
    };
    
    window.addEventListener('localStorageChange', handleLocalStorageChange);
    return () => {
      window.removeEventListener('localStorageChange', handleLocalStorageChange);
    };
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
    localStorage.removeItem('ovpn_state');
    localStorage.removeItem('vms_state');
    window.dispatchEvent(new Event('localStorageChange'));
    setUser(null);
    setOvpnState(null);
    setVmsState(null);
  };

  // WG retrieve
  const getProfile = async () => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/${user.id}/ovpn`, {
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
    const fetchUserStates = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const newOvpnState = response.data.ovpn_state;
        if (newOvpnState !== ovpnState) {
          setOvpnState(newOvpnState);
          updateLocalStorage('ovpn_state', newOvpnState);
        }
        
        const newVmsState = response.data.vms_state;
        if (newVmsState !== vmsState) {
          setVmsState(newVmsState);
          updateLocalStorage('vms_state', newVmsState);
        }
      } catch (err) {
        console.error('Error fetching user states:', err);
      }
    };

    const devMode = localStorage.getItem('dev') === "true";
    
    if (user && !devMode) {
      fetchUserStates();
      interval = setInterval(fetchUserStates, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user, ovpnState, vmsState]);


  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      ovpnState,
      vmsState,
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
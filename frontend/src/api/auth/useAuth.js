import { useState } from 'react';
import axios from 'axios';
import { API_URL } from "../../config";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fonction d'inscription qui appelle l'API backend
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise} - Résultat de l'opération
   */
  const register = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Appel à l'API d'inscription
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        password
      });
      
      // Stockage du token dans le localStorage
      localStorage.setItem('token', response.data.token);
      
      // Mise à jour de l'état utilisateur
      setUser(response.data.user);
      
      setLoading(false);

      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
      setLoading(false);
      throw err;
    }
  };

  /**
   * Fonction de connexion qui appelle l'API backend
   * @param {string} username - Nom d'utilisateur
   * @param {string} password - Mot de passe
   * @returns {Promise} - Résultat de l'opération
   */
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // Appel à l'API de connexion
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      
      // Stockage du token dans le localStorage
      localStorage.setItem('token', response.data.token);
      
      // Mise à jour de l'état utilisateur
      setUser(response.data.user);
      
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue');
      setLoading(false);
      throw err;
    }
  };

  /**
   * Fonction de déconnexion
   */
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  /**
   * Vérifie si l'utilisateur est connecté en vérifiant le localStorage
   */
  return {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };
};

export default useAuth;
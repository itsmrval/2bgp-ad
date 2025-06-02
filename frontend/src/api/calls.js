import { API_URL } from "../config";

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Request failed');
  }
  return response.json();
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  return handleResponse(response);
};

export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const deleteUser = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getLevels = async () => {
  const response = await fetch(`${API_URL}/levels`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const createLevel = async (levelData) => {
  const response = await fetch(`${API_URL}/levels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(levelData),
  });
  return handleResponse(response);
};

export const deleteLevel = async (levelId) => {
  const response = await fetch(`${API_URL}/levels/${levelId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const getScoreboard = async () => {
  const response = await fetch(`${API_URL}/points`, {
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

export const awardUserPoints = async (userId, levelId, flag = '') => {
  const response = await fetch(`${API_URL}/points/${userId}/${levelId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ flag }),
  });
  return handleResponse(response);
};

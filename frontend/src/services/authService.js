import axios from 'axios';

const API_URL_USERS = '/api/users/';
const API_URL_LISTS = '/api/lists/';

const register = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL_USERS, userData, config);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL_USERS + 'login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

const uploadCsv = async (file, token) => {
  const formData = new FormData();
  formData.append('csvFile', file);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL_LISTS + 'upload', formData, config);
  return response.data;
};

const getAgents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_USERS + 'agents', config);
  return response.data;
};

const getListItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL_LISTS, config);
  return response.data;
};


const authService = {
  register,
  login,
  logout,
  uploadCsv,
  getAgents,
  getListItems,
};

export default authService;
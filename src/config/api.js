const API_BASE_URL = import.meta.env.PROD
  ? 'https://kuwait-founder-be.onrender.com'
  : '';

export const api = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
  });
  return response;
};

export default API_BASE_URL;

import axios from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL; // Base URL for backend

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`, // Base URL for your backend
  headers: {
    "Content-Type": "application/json", // Default header for all requests
  },
});

// Add an interceptor to include the token automatically
axiosInstance.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`; // Add token to headers
  }
  return config;
});

export default axiosInstance;

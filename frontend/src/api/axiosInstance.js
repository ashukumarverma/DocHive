import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for your backend
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
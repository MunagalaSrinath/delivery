import axios from "axios";
import { getToken } from "../utils/localStorage";

// The base URL for your backend API
const API_URL = "http://localhost:5000/api";
//
// IMPORTANT: Change this to the actual port your backend is running on

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// This is an interceptor. It's a function that runs BEFORE every single API request is sent.
api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get the token from localStorage
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

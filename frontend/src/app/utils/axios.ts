import axios from "axios";
import API_BASE_URL from "../../config";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Send cookies with requests
});

// Helper function to get token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((row) => row.startsWith("access_token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// Add a request interceptor to include the Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies(); // Extract token from cookies
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Optional: Log responses for debugging
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Response error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;

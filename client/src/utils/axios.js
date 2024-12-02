import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
  delayed: true,
});

instance.interceptors.request.use(
  (config) => {
    const refreshToken = Cookies.get('refreshToken');    
    // If refresh token exists, add it to headers
    if (refreshToken) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }

    if (config.delayed) {
      return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

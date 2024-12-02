import axios from "axios";
import cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
  delayed: true,
});

instance.interceptors.request.use(
  
  (config) => {
    let token = localStorage.getItem("token");
    let user = cookies.get("user");
    let cartId = cookies.get("cartId");
    
    config.headers.Authorization = `Bearer ${token};user ${user};cartId ${cartId}`;
    
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

import axios from "axios";
const isAuthenticated = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${isAuthenticated}`,
  },
  withCredentials: true,
});

//globle error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("AccessToken");
      // Unauthorized – maybe token expired
      console.error("Unauthorized. Logging out...");
      // Optionally clear tokens, redirect to login
    }

    if (status === 403) {
      console.error("Forbidden");
    }

    // if (status === 404) {
    //   console.error("Not Found");
    // }

    if (status >= 500) {
      console.error("Server Error");
    }

    // Optionally display a global toast message
    // showToast(error.response?.data?.message || 'Something went wrong');

    return Promise.reject(error);
  }
);

export default axiosInstance;

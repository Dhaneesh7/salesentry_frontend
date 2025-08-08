import axios from 'axios';
const BASE_URL= "http://5.189.180.8:8010";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
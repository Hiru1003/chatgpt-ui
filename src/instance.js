// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend URL
  timeout: 5000, // Adjust timeout as needed
});

export default instance;

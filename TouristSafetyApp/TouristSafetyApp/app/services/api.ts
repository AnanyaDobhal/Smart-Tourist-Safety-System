import axios from "axios";

// 🔴 CHANGE THIS IP TO YOUR LAPTOP IP
const BASE_URL = "http://192.168.29.194:5000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

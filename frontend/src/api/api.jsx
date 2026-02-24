import axios from "axios";

const api = axios.create({
  baseURL: "https://outright-flour.onrender.com/api", // your backend URL
});

export default api;

import axios from "axios";

export const query = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // baseURL: "http://localhost:8000/",
  // withCredentials: true,
});

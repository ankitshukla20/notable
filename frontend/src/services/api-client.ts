import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://notable-api.onrender.com/api",
  withCredentials: true,
});

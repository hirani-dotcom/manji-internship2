import axios from "axios";

// Create a reusable Axios instance
const api = axios.create({
  baseURL: "https://us-central1-summaristt.cloudfunctions.net", 
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

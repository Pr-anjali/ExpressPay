import axios from 'axios'
let token =
  (typeof window !== 'undefined') ? (localStorage.getItem("Authorization") ||
    window.localStorage.getItem("Authorization")) : null

const axiosFetch  = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    Authorization: `Bearer ${token}`,
  }
});

export default axiosFetch;
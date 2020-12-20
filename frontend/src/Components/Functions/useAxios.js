const axios = require("axios");
const token = localStorage.getItem("auth-token");

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "auth-token": `${token}`,
  },
});
export default instance;

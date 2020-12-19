const axios = require("axios");
const port = REACT_SCRIPTS.process.env.port || 5000;
const instance = axios.create({
  baseURL: `http://localhost:${port}/api`,
});
export default instance;

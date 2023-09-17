import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://165.232.104.38/api",
});

export default apiRequest;

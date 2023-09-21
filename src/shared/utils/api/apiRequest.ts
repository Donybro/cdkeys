import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://165.232.104.38/api",
});
apiRequest.interceptors.request.use(function (config) {
  const token = localStorage.getItem("JWT");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
    }
  },
);
export default apiRequest;

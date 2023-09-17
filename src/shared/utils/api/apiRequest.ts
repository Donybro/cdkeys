import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://66ce63c9-bc72-4abe-a3af-fae92de1d73d.mock.pstmn.io",
});

export default apiRequest;

import axios from "axios";

//To Do: only for dev! Change in Prod

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

export default axiosClient;

import axios from "axios";

//To Do: only for dev! Change in Prod

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKENDURL || ""}/api`,
  withCredentials: true,
});

export default axiosClient;

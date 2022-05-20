import axios from "axios";

export const axiosToken = axios.create({
  baseURL: "/api/",
});

export const axiosTMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

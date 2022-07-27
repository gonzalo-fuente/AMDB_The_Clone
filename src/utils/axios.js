import axios from "axios";

export const axiosToken = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

export const axiosTMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

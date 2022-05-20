import axios from "axios";

export const axiosToken = axios.create({
  baseURL: "http://challenge-react.alkemy.org",
});

export const axiosTMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

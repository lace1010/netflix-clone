import axios from "axios";

const BASE_BACKEND_URL = process.env.REACT_APP_HEROKU_URL;

export const publicRequest = axios.create({
  baseURL: BASE_BACKEND_URL,
});

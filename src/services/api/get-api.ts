import axios from "axios";

const URL_CORS = "https://cors-anywhere.herokuapp.com/";

export const getApi = axios.create({
  baseURL: `${URL_CORS}https://itunes.apple.com`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});
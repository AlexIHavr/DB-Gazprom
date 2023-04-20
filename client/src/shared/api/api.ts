import axios from 'axios';

export const serverApi = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_API}/`,
});

export const vtdApi = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_API}/vtd`,
});

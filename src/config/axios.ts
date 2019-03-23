import axios from 'axios';
import history from './history'

const appID = "q5HRLsW98Fem9zhjBkQnurVR"
const appSecret = "Yg2AF3XwqcnoQ1LPnV8gD27n"

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
});

interface IAxiosError {
  response: Response
}

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error: IAxiosError) {
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, function (error: IAxiosError) {
  // Do something with response error
  if (error.response.status === 401) {
    history.push('/login')
  }
  return Promise.reject(error);
});

export default instance
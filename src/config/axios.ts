import axios from 'axios'

const appId = 'Wr4Wrydm934PGcHdF2194Yxq'
const appSecret = '6j2Z8ncnmn3R2SpqNfuvxw25'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appId,
    't-app-secret': appSecret
  },
  timeout: 1000,
})

// Add a request interceptor
instance.interceptors.request.use(config => {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers.Authorization = `Bearer ${xToken}`
  }
  return config;
}, (error) => {
  console.error(error)
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default instance
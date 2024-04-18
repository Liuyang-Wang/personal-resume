import axios from 'axios';
import { getCookie } from '@/utils';
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
    const { token } = getCookie();
    config.baseURL = '/api';
    config.withCredentials = true; // 允许携带token
    config.timeout = 6000; // 响应时间
    if (token) {
      config.headers = {
        Authorization: 'Bearer ' + token
      };
    }
    return config;
  },
  error => Promise.reject(error)
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.resolve(error);
  }
);

const request = option => {
  option.method = option.method.toLowerCase();
  const newOption = {
    url: '/',
    method: 'get',
    params: {}
  };
  Object.assign(newOption, option);
  return new Promise((resolve, reject) => {
    axios(newOption)
      .then(res => {
        resolve(res.data);
      })
      .catch(error => reject(error));
  });
};

export default request;

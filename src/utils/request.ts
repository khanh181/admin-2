import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 环境
// const env = process.env.NDOE_ENV || 'development';

const BASE_URL = '/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

// // 请求拦截
// axios.interceptors.request.use((request) => {
//   // 添加token、应用信息等
//   request.headers = {
//     ...request.headers,
//     token: sessionStorage.getItem('x-viteApp-token') || '',
//   };
//   return request;
// });

// 对返回的结果做处理
instance.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 3) {
      message.error('time out');
      sessionStorage.removeItem('userinfo');
      // history.replace('/');
      return null;
    }
    return res;
  },
  (err) => {
    console.log('err', err);
  },
);

const request = <T>(reqConfig: AxiosRequestConfig): Promise<T> => {
  const data1 = instance.request<T, T>(reqConfig).then((o) => {
    console.log('request', o);
    return o;
  });
  // console.log(reqConfig)
  return data1;
};

export default request;
export type { AxiosInstance, AxiosResponse };

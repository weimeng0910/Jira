import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs from 'qs';

import { showMessage } from './status';
// 导入全局配制
import { API_URL, authProviderToken } from '@/config';

// 用接口类型进行typeScript的类型覆盖，解决axios版本不同产生的config未定义问题
interface Params {
  username: string,
  password: string
}
interface YXRequestConfig extends AxiosRequestConfig {
  interceptors?: YXRequestConfig,
  headers?: any
}

// 数据返回的接口
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

enum RequestEnums {
  TIMEOUT = 20_000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}

// 全局请求拦截
const axiosInstance: AxiosInstance = axios.create({
  // 默认地址
  baseURL: API_URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [
    function (data) {
      //由于使用的 form-data传数据所以要格式化
      delete data.Authorization;
      data = qs.stringify(data);
      return data;
    }
  ]
});

// axios实例拦截响应，因为我们接口的数据都在res.data下，所以我们直接返回res.data
/**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
*/
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // const { data, config } = response; // 解构
    if (response.headers.authorization) {
      localStorage.setItem(authProviderToken, response.headers.authorization);
    } else if (response.data && response.data.token) {
      localStorage.setItem(authProviderToken, response.data.token);
    }

    if (response.status === 200) {
      return response;
    }
    showMessage(response.status);
    return response;

  },
  // 请求失败
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);

    }
    return Promise.reject(response?.data);

  }
);

// axios实例拦截请求
/**
    * 请求拦截器
    * 客户端发送请求 -> [请求拦截器] -> 服务器
    * token校验(JWT) : 接受服务器返回的token,存储到localStorage/本地储存当中
 */

axiosInstance.interceptors.request.use(
  (config: YXRequestConfig) => {
    const token = localStorage.getItem(authProviderToken) || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // eslint-disable-next-line promise/no-promise-in-callback
  (error: AxiosError) => Promise.reject(error)
);

/**
 * @description: 用户登录
 * @params {ILogin} params
 * @return {Promise}
 */
export const Login = (params: Params): Promise<IResponse> => axiosInstance.post(`${API_URL}/login`, params).then(res => res.data);

/**
 * @description: 通过id获取用户
 * @params {IUser} params
 * @return {Promise}
 */
//export const getUserInfo = (params: IUser): Promise<IResponse> => axiosInstance.post('user/getInfo', params).then(res => res.data);
export default axiosInstance;

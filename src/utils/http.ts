
import { useCallback } from 'react';
import qs from 'qs';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import * as authJira from './authJiraProvider';
// 基础URL，axios将会自动拼接在url前
import { API_URL } from '../config';

interface Config extends AxiosRequestConfig {

  data?: object;
  token?: string;
}
interface ResponseError extends Error {
  status?: number;
  code?: number
}

export const http = async (
  endpoint: string, { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    url: `${API_URL}/${endpoint}`,
    data: JSON.stringify(data),
    //请求头
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,

  };
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    return data;
  }
  return axios(config)
    .then(async (response: AxiosResponse) => {
      if (response.status === 401) {
        // 客户瑞退出登陆
        await authJira.logout();
        // 页面重新刷新
        window.location.reload();
        const errorMessage: ResponseError = { name: 'UnauthorizedError', code: 401, message: '请重新登录' };
        throw errorMessage;
      }

      const resultData = await response.data;
      if (response) {
        return data;
      }
      throw resultData;



    });
};
export const clientApi = async (endpoint: string) => {
  //const page = 1;
  const startChar = endpoint.includes('?') ? '&' : '?';
  //const keyLang = `${startChar}api_key=${API_KEY}&language=${lang}&page=${page}`;

  return axios.post(`${API_URL}/${endpoint}${startChar}`).catch(error => {
    if (error.response) {
      const err = {
        ...error.response,
        message: error.response?.data?.status_message,
      };
      throw err;
    }
    throw error;



  });
};

export const useHttp = async () => {
  //const { userData } = useAuth();
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  const token = await authJira.getToken() || '';
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token }),
    [token]
  );
};

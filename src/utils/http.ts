
import { useCallback } from 'react';
import qs from 'qs';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { useAuth } from '@/context/AuthContext';
import * as authJira from './authJiraProvider';
import { API_URL } from '../config';

interface Config extends AxiosRequestConfig {
  token?: string;
  data?: object;
}
interface ResponseError extends Error {
  status?: number;
  code?: number
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    url: `${API_URL}/${endpoint}`,
    data: JSON.stringify(data),
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
        await authJira.logout();
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
export const useHttp = () => {
  const { userData } = useAuth();
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: userData?.token }),
    [userData?.token]
  );
};

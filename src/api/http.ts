//import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { serviceAxios } from './request';
/**
 * @param {String} method  请求的方法：get,post,delete,put
 * @param {String} url     请求的url
 * @param {Object} data    请求的参数
 * @param {Object} config   请求的配置
 * @return {Promise}   返回一个promise对象，axios请求数据返回值
 */
//interface Todo {
//  title: string;
//  description: string;
//  completed: boolean;
//}

//type TodoPreview = Pick<Todo, "title" | "completed">;
//interface PostRequestParams {
//  name: string,
//  personId: string,
//}
// 封装 GET POST 请求并导出
export const http = async ({
  method,
  url,
  data,
  config
}: any): Promise<any> => {
  console.log(data, '前瑞API002');

  method = method.toLowerCase();
  switch (method) {
    case 'get':
      return serviceAxios.get(url, { params: data, ...config });
    case 'post':
      return serviceAxios.post(url, data, { ...config });
    case 'put':
      return serviceAxios.put(url, data, { ...config });
    case 'delete':
      return serviceAxios.delete(url, { params: data, ...config });
    default:
      return serviceAxios.get(url, { params: data, ...config });
  }

};
/**
 * API解藕
 * 为了同一个接品多次使用，为了API的统一管理
 */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { http } from './http';

// 返回res.data的interface
export interface IResponse<T = any, D = any> {
  code: number | string;
  data: T;
  msg: string;
  status: string;
  config: AxiosRequestConfig<D>;
  request?: any;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IUser {
  name?: string;
  personId?: string | number;
}

/**
 * @description: 用户登录或者注册
 * @params {String} url
 * @params {ILogin} params
 * @return {Promise}
 */
export const clientApi = (url: string, params: ILogin, config: AxiosRequestConfig): Promise<IResponse> => http({ url, params, config }).then(res => res.data.user);

/**
 * @description: 获取负责人列表
 * @params {IUser} params
 * @return {Promise}
 */
export const getUsersList = (): Promise<AxiosResponse> => http({
  url: 'users',
  method: 'post'
}
).then(res => res);
/**
 * @description: 获取项目列表
 * @params {IUser} params
 * @return {Promiprojectsse}
 */
export const getProjectsList = (params: IUser): Promise<AxiosResponse> => http({
  url: 'projects',
  data: params,
  method: 'get'
}
).then(res => res);

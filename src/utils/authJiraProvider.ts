/*
* 在真实环境中，如果使用firebase这种第三方，auth服务的话，本文件不需要开发
*/
import axios from 'axios';

// 导入全局配制
import { API_URL, localStorageKey } from '../config';


interface Params {
  username: string,
  password: string
}

interface User {
  id: string,
  username: string,
  passwordHash: string,
  token: string | ''
}

// 封装axios
async function clientApiJira(endpoint: string, data: Params) {
  const config = {
    headers: { 'Content-Type': 'text/html;charset:utf-8' },
  };


  return axios
    .post(`${API_URL}/${endpoint}`, JSON.stringify(data), config)
    .then(response => response.data)
    .catch(error => {
      if (error.response) {
        throw error.response.data;;
      }
    });
};

// 获得存储的token
async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

// 重新设置用户的token令牌
function storeToken({ user }: { user: User }) {
  window.localStorage.setItem(localStorageKey, user.token || '');

  return user;
}

// 获得登陆后的用户名和密码生成token令牌
async function login(params: Params) {
  const { username, password } = params;
  return clientApiJira('login', { username, password }).then(storeToken);
}

// 获得注册后的用户名和密码生成token令牌
async function register(params: Params) {
  const { username, password } = params;
  return clientApiJira('register', { username, password }).then(storeToken);
}

// 获得登陆退出后的移除token令牌
async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { getToken, login, register, logout, };


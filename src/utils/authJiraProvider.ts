/*
* 在真实环境中，如果使用firebase这种第三方，auth服务的话，本文件不需要开发
*/
import axios from 'axios';

// 导入全局配制
import { API_URL, authProviderToken } from '../config';
// 导入类型
import { AuthForm, User } from '@/types/user';

// 封装axios
async function clientApiJira(endpoint: string, data: AuthForm) {
  const config = {
    headers: { 'Content-Type': 'application/json' },

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
  return window.localStorage.getItem(authProviderToken);
}

// 重新设置用户的token令牌
function storeToken({ user }: { user: User }) {
  console.log(user.token, '123456');

  window.localStorage.setItem(authProviderToken, user.token || '');
  return user;
}

// 获得登陆后的用户名和密码生成token令牌
async function login(params: AuthForm) {
  const { username, password } = params;
  return clientApiJira('login', { username, password }).then(storeToken);
}

// 获得注册后的用户名和密码生成token令牌
async function register(params: AuthForm) {
  const { username, password } = params;
  return clientApiJira('register', { username, password }).then(await storeToken);

}

// 获得登陆退出后的移除token令牌
async function logout() {
  window.localStorage.removeItem(authProviderToken);
}

export { getToken, login, register, logout, };


export { authProviderToken } from '../config';

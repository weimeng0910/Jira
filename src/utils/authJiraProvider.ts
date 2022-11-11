/*
* 在真实环境中，如果使用firebase这种第三方，auth服务的话，本文件不需要开发
* 身份验证和权限认证的文件
*/
import axios from 'axios';

//import { clientApi } from '@/api/index';
// 导入全局配制，本地存储中的 token 键
import { API_URL, authProviderToken } from '../config';
// 导入类型
import { AuthForm, UserData } from '@/types/user';

//Create a function that generates a token
async function clientApiJira(endpoint: string, data: AuthForm) {
  console.log(data, '前瑞001');


  //const retult = await clientApi(endpoint, data);

  //console.log(retult.data, '002');


  //const retult = await clientApi(endpoint, data);
  //console.log(retult, '数据111');
  const config = {
    headers: { 'Content-Type': 'application/json' },

  };
  //return retult?.data.userData;
  return axios
    .post(`${API_URL}/${endpoint}`, JSON.stringify(data), config)
    .then(response => response.data.user)
    .catch(error => {
      if (error.response) {
        throw error.response.data.user;
      }
    });
};
// Gets Token.

async function getToken() {
  return window.localStorage.getItem(authProviderToken);
}

//Set Token.
function storeToken(userData: UserData) {

  window.localStorage.setItem(authProviderToken, userData.token || '');
  return userData;
}

// 获得登陆后的用户名和密码生成token令牌
async function login(params: AuthForm) {
  const { username, password } = params;
  return clientApiJira('login', { username, password }).then(storeToken);
}
//const login = (data: AuthForm) => axios.post(`${API_URL}/login`, JSON.stringify(data), {

//  headers: {
//    'Content-type': 'application/json',
//  }
//}).then(async (response) => {
//  if (response.data) {
//    console.log(response.data.user, '12返回的token');

//    return storeToken(await response.data.user);
//  }
//  throw await response.data.user;

//});
// 获得注册后的用户名和密码生成token令牌
async function register(params: AuthForm) {
  const { username, password } = params;
  return clientApiJira('register', { username, password }).then(storeToken);

}
// 获得登陆退出后的移除token令牌
async function logout() {
  window.localStorage.removeItem(authProviderToken);
}

export { getToken, login, register, logout, };

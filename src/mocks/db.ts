/* 模拟一个后端
   本地存储中的数据备份 */

import * as CryptoJS from 'crypto-js';

// 定义写入localStorageKey
const localStorageKey = 'db-back-netflix-clone-users';

interface Params {
  username: string;
  password: string;
}

interface User extends Params {
  id: string;
  passwordHash?: string;
}

// 枚举
enum Users {
  User
}

interface ResponseError extends Error {
  status?: number;
}

// 加载存在 localStorage里的用户数据
const loadUsers = () => {
  // 从localStorage读取用户数据
  const users = JSON.parse(window.localStorage.getItem(localStorageKey)!); // 非空断言运算符告诉 typescript 您知道自己在做什么

  return users ?? []; // ??在value1和value2之间，只有当value1为null或者 undefined 时取value2，否则取value1
};
const clean = (user: User) => {
  if (user.passwordHash) {
    const { passwordHash, ...rest } = user;
    return rest;
  }
  return null;
};
// 检查用户存在
async function loadUserById(id: any, cleanFields = false) {
  const user = loadUsers().find((item: any) => item.id === id);
  return cleanFields && user ? clean(user) : user;
}
// 保存用户
const saveUsers = (users: Users) => {
  window.localStorage.setItem(localStorageKey, JSON.stringify(users));
};
// 把新用户写入用户数组
async function saveUser(user: User) {
  const users = loadUsers();
  users.push(user);
  saveUsers(users);
}
// 检查用户名和密码是否存在
const validateUser = (params: Params) => {
  const { username, password } = params;
  if (!username) {
    const error: ResponseError = new Error('Le nom dutilisateur est obligatoire');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error: ResponseError = new Error('Le mot de passe est obligatoire');
    error.status = 400;
    throw error;
  }
};


// 加密数据
function hashcode(data: string) {
  const key = '01234567890123456789012345678901';
  const keyHash = CryptoJS.enc.Utf8.parse(key);
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), keyHash).toString();
  return encryptedData;
};



// 创建用户,组装数据
async function createUser(params: Params) {
  // 解构传进来的参数
  const { username, password } = params;
  // 检查用户是否存在
  validateUser({ username, password });
  const id = hashcode(username);
  const passwordHash = hashcode(password);

  const uid = await loadUserById(id);
  if (uid) {
    const error: ResponseError = new Error(`无法创建用户，因为 '${username}' 存在 `);
    error.status = 400;
    throw error;
  }
  const user = { id, username, password, passwordHash };
  saveUser(user);
  return loadUserById(id);
}


// 向客户瑞输出token
// async function authenticate(params: Params) {
//  const { username, password } = params;
//  validateUser({ username, password })
//  const id = hashcode(username)
//  const user = (await loadUserById(id)) || {}
//  if (user.passwordHash === hashcode(password)) {
//    return { ...clean(user), token: Buffer.from(user.id).toString('base64') }
//  }
//  const error: ResponseError = new Error("Nom d' utilisateur ou mot de passe incorrect")
//  error.status = 400
//  throw error
// }

// 导出方法
export { createUser };

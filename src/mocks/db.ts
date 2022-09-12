/* 模拟一个后端
   本地存储中的数据备份 */
import CryptoJS from 'crypto-js';

// 定义写入localStorageKey
const localStorageKey = 'db-back-jira-clone-users';

interface Params {
  username: string;
  password: string;
}

interface User {
  id: string;
  username: string;
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
// 检查用户的ID存在
async function loadUserById(id: string, cleanFields = false) {
  //调用 loadUsers函数来检查是否存在相同的ID,如果返回true，则搜索停止。
  const user = loadUsers().find((item: User) => item.id === id);
  // 两个 & 符号表示 && 与运算符：
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
    const error: ResponseError = new Error('用户名是必须的');
    error.status = 400;
    throw error;
  }
  if (!password) {
    const error: ResponseError = new Error('密码是必须的');
    error.status = 400;
    throw error;
  }
};


// 加密数据
function hashcode(data: string) {
  // 生成随机的key ,不能生成随机key,要不然无法判断用户是否存在
  // const keyStr = CryptoJS.lib.WordArray.random(16).toString();
  const keyStr = '01234567890123456789012345678901';
  // 字符串类型的key用之前需要用uft8先parse一下才能用
  const SECRET_KEY = CryptoJS.enc.Utf8.parse(keyStr);
  // 十六位十六进制数作为密钥偏移量
  const SECRET_IV = CryptoJS.enc.Utf8.parse(keyStr);

  const dataHex = CryptoJS.enc.Utf8.parse(data);
  // 使用生成的密钥加密消息
  const encryptedData = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encryptedData.ciphertext.toString();
};
//async function authenticate(params: Params) {
//  // 解构传进来的参数
//  const { username, password } = params;
//  validateUser({ username, password });
//  const id = hashcode(username);
//  const user = (await loadUserById(id)) || {};
//  if (user.passwordHash === hashcode(password)) {
//    return { ...clean(user), token: Buffer.from(user.id).toString('base64') };
//  }
//  const error: ResponseError = new Error("Nom d' utilisateur ou mot de passe incorrect");
//  error.status = 400;
//  throw error;
//}


// 创建用户,组装数据
async function createUser(params: Params) {
  // 解构传进来的参数
  const { username, password } = params;
  // 检查用户是否为空
  validateUser({ username, password });
  // 加密用户名生成ID
  const id = hashcode(username);
  const passwordHash = hashcode(password);
  // 读取用户Id,判卷用户ID是否存在
  const uid = await loadUserById(id);
  if (uid) {
    const error: ResponseError = new Error(`无法创建用户，因为 '${username}' 存在 `);
    error.status = 400;
    throw error;
  }
  // 组装新的用户数据
  const user = { id, username, passwordHash };
  // 何存用户
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

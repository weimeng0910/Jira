/*
*  模拟一个后端
*  本地存储中的数据备份
*/

// 加密
import CryptoJS from 'crypto-js';

// 定义写入localStorageKey
import { localStorageKey } from '../config';
// 导入生成token的函数
import { generteToken } from './core/util';
import { ResponseError, RequestBody, User, Project } from './type/handlersType';


type Users = User[];

// 加载存在 localStorage里的用户数据
const loadUsers = (): Users => {

  const users = JSON.parse(window.localStorage.getItem(localStorageKey)!); // 非空断言运算符告诉 typescript 您知道自己在做什么

  return users ?? []; // ??在value1和value2之间，只有当value1为null或者 undefined 时取value2，否则取value1
};

const clean = (user: User) => {
  let result;
  // 如果用户存在passwordHash
  if (user.passwordHash) {
    //解构其他参数并返回
    const { passwordHash, ...rest } = user;
    result = rest;
  }
  return result;
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
const validateUser = (params: RequestBody) => {
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

// 创建用户,组装数据
async function createUser(data: { username: string, password: string }) {
  // 解构传进来的参数
  const { username, password } = data;
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


// 客户登陆时返回用户的信息,生成token
async function authenticate(params: RequestBody) {
  const { username, password } = params;
  // 检查用户是否为空
  validateUser({ username, password });
  // 根据用户名，生成唯一ID
  const id = hashcode(username);
  // 根据ID读取相关用户数据
  const user = (await loadUserById(id)) as User;
  //定义令牌
  const token = generteToken(id, 2);
  if (user.passwordHash === hashcode(password)) {

    return { ...clean(user), token };
  }
  const error: ResponseError = new Error('用户名或者密码不正确');
  error.status = 400;
  throw error;
}

/**  screensProjectsData **/

// 加载存在 localStorage里的项目数据
const loadScreensData = (storageKey: string) => {

  const screensData = JSON.parse(window.localStorage.getItem(storageKey)!) || []; // 非空断言运算符告诉 typescript 您知道自己在做什么

  return screensData ?? []; // ??在value1和value2之间，只有当value1为null或者 undefined 时取value2，否则取value1
};

// 根据传入参数响应数据
async function ScreensProjectsData(storageKey: string, personId: string) {
  //console.log(personId, '传入数据库的personId');


  // 加载localStorage里的项目数据
  const projectsData = loadScreensData(storageKey);
  //localStorage是string|null,personId传入的是string，所以只需要if(personId)
  if (personId) {
    const result = projectsData.find((item: Project) => item.personId === personId);
    return result;
  }
  return projectsData;

};
// 加载项目管理用户数据
async function ScreensUserData(storageKey: string) {

  // 加载localStorage里的项目数据
  const userData = loadScreensData(storageKey);
  //localStorage是string|null,personId传入的是string，所以只需要if(personId)
  //if (userId) {
  //  const result = userData.find((item: UserData) => item.id === userId);
  //  return result;
  //}
  return userData;

}
// 导出注册方法createUser，登陆方法authenticate
export { createUser, authenticate, loadUserById, ScreensProjectsData, ScreensUserData };

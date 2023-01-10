/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * 初始化数据
 */

// 导入数据
import fakeData from './fake.json';
import { projectDB, userDB } from '../config';

// 将初始化数据存入 window.localStorage
const project = () =>
  window.localStorage.getItem(projectDB) || window.localStorage.setItem(projectDB, JSON.stringify(fakeData.projects));
const users = () =>
  window.localStorage.getItem(userDB) || window.localStorage.setItem(userDB, JSON.stringify(fakeData.users));
export const initData = () => {
  project();
  users();
};

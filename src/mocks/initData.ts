// 导入数据
import fakeData from './fake.json';
import { projectDB, userDB } from '../config';

// 将初始化数据存入 window.localStorage
const project = () =>
  window.localStorage.getItem(projectDB) || window.localStorage.setItem(projectDB, JSON.stringify(fakeData.projects));
const user = () =>
  window.localStorage.getItem(userDB) || window.localStorage.setItem(userDB, JSON.stringify(fakeData.users));
export const initData = () => {
  project();
  user();
};

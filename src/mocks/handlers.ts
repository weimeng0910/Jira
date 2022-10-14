/*
* handlers： 主要为定义 API 逻辑的代码
*/
import { rest, RestRequest } from 'msw';

// 引入处理数据的文件
import * as db from './db';
// 导入开发URL
import { API_URL, projectDB } from '../config';
// 导入数据
import { initData } from './initData';
// 设置延迟
// const sleep = t:number => new Promise(resolve => setTimeout(resolve, t));
interface ResponseError extends Error {
  status?: number;
  message: string;
}
//Request body type.
interface RequestBody {
  username: string;
  password: string;
}

//Request parameters
interface PostRequestParams {
  personId: string,
}
//interface ProjectData {
//  id: number,
//  name: string,
//  pesonId: number,
//  organization: string,
//  creted: number

//}
//数据初始化
initData();
// 获得token
const getToken = (req: RestRequest) => req.headers.get('Authorization')?.replace('Bearer ', '');

//检查用户的token
// async ,返回的都是Promise对象
async function getUser(req: RestRequest) {
  const token = getToken(req);
  if (!token) {
    const error: ResponseError = new Error('Token是强制性的 ');
    error.status = 401;
    throw error;
  }
  let userId;

  try {
    // jwt解密ID
    userId = Buffer.from(token, 'base64').toString();
    // userId = jwt.decode(token) as string;
  } catch {
    // 失败了就捕获
    const error: ResponseError = new Error('令牌无效。 请重新连接');
    error.status = 401;
    throw error;
  }
  const user = db.loadUserById(userId, true);
  if (!user) {
    const error: ResponseError = new Error('找不到使用此令牌的用户');
    error.status = 401;
    throw error;
  }
  return user;
}

export const handlers = [

  // 注册
  rest.post<RequestBody, PostRequestParams>(`${API_URL}/register`, async (req, res, ctx) => {

    // 获取到url 中的参数
    // await Promise.then 成功的情况，对应await
    const body = await req.json();

    const username = body.username as string;
    const password = body.password as string;

    // 组装数据
    const userFields = { username, password };

    // 写入用户注册数据
    await db.createUser(userFields);
    let user;
    // Promise.catch 异常情况对应 try... catch
    try {
      // await成功了就赋值
      user = await db.authenticate(userFields);
    } catch (error) {
      // 失败了就捕获错误
      if (error instanceof ReferenceError) {
        return res(
          ctx.status(400),
          ctx.json({ status: 400, message: error.message }),
        );
      }
    }
    return res(ctx.json({ user }));
  }),

  // 登陆
  rest.post<RequestBody, PostRequestParams>(`${API_URL}/login`, async (req, res, ctx) => {

    const body = await req.json() as RequestBody;

    const username = body.username as string;
    const password = body.password as string;
    // 组装数据
    const userFields = { username, password };

    const userData = await db.authenticate(userFields);
    return res(ctx.json({ userData }));
  }),

  // 响应get请求获得项目数据
  rest.get<RequestBody, PostRequestParams>(`${API_URL}/projects`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { personId } = req.params;
    //调用写入数据的函数
    const projectData = await db.ScreensProjectsData(projectDB, personId);
    if (projectData) {
      return res(ctx.status(200), ctx.json(projectData));
    }
    return res(ctx.status(500));

  }),

  rest.get<RequestBody>(`${API_URL}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(ctx.json({ user: { ...user, token } }));
  }),
];

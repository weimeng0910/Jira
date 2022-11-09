/*
* handlers： 主要为定义 API 逻辑的代码
*/
import { rest, RestRequest } from 'msw';
//导入jwt解密token中的id
import jwt from 'jsonwebtoken';

// 引入处理数据的文件
import * as db from './db';
// 导入开发URL
import { API_URL, projectDB, userDB } from '../config';
// 导入数据
import { initData } from './initData';
import { ResponseError, RequestBody, PostRequestParams } from './type/handlersType';


// 设置延迟
// const sleep = t:number => new Promise(resolve => setTimeout(resolve, t));
//数据初始化
initData();

/*
* 用户携带token登陆，通过token中的id查找用户是否存在
*/

// 获得用户携带存在localstorega中的token
export const getToken = (req: RestRequest) => req.headers.get('Authorization')?.replace('Bearer ', '');

//通过请求头中携带的token，并解密其中的id来检查用户是否存在
// async ,返回的都是Promise对象
async function getUser(req: RestRequest) {
  //获得token
  const token = getToken(req);
  if (!token) {
    const error: ResponseError = new Error('Token是强制性的 ');
    error.status = 401;
    throw error;
  }
  // 定义一个变量来接收token中的id
  let userId;

  try {
    // jwt解密ID
    //userId = Buffer.from(token, 'base64').toString();
    userId = jwt.decode(token) as string;
  } catch {
    // 失败了就捕获
    const error: ResponseError = new Error('令牌无效。 请重新连接');
    error.status = 401;
    throw error;
  }
  // 将id传入获得用户
  const user = db.loadUserById(userId, true);
  if (!user) {
    const error: ResponseError = new Error('找不到使用此令牌的用户');
    error.status = 401;
    throw error;
  }
  return user;
}

/*
* 处理各种请求把数据返回前端
*/

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
    console.log(req, '后瑞');

    const body = await req.json() as RequestBody;

    const username = body.username as string;
    const password = body.password as string;
    // 组装数据
    const userFields = { username, password };

    const user = await db.authenticate(userFields);
    return res(ctx.json({ user }));
  }),

  // 响应get请求获得项目数据
  rest.get<RequestBody, PostRequestParams>(`${API_URL}/projects`, async (req, res, ctx) => {

    // 获得前瑞发送的参数
    const personId = req.url.searchParams.get('personId')!;
    console.log(personId, '后瑞接收参数');

    const name = req.url.searchParams.get('name')!;

    //调用写入数据的函数
    const projectData = await db.ScreensProjectsData(projectDB, personId, name);


    if (projectData) {
      return res(ctx.status(200), ctx.json(projectData));
    }
    return res(ctx.status(500));

  }),
  // 响应post请求用户列表数据
  rest.post<RequestBody>(`${API_URL}/users`, async (_req, res, ctx) => {
    //调用写入数据的函数
    const userData = await db.ScreensUserData(userDB);
    if (userData) {
      return res(ctx.status(200), ctx.json(userData));
    }
    return res(ctx.status(200), ctx.json(userData));

  }),
  // 携带前瑞token请求
  rest.get<RequestBody>(`${API_URL}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(ctx.json({ user: { ...user, token } }));
  }),
];

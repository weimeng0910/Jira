/*
* handlers： 主要为定义 API 逻辑的代码
*/
import { rest, RestRequest } from 'msw';
// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';

// 引入处理数据的文件
import * as db from './db';
// 导入开发URL
import { API_URL } from '../config';
import { AuthForm } from '@/types/user';
// 设置延迟
// const sleep = t:number => new Promise(resolve => setTimeout(resolve, t));
interface ResponseError extends Error {
  status?: number;
}

// 获得token
const getToken = (req: RestRequest) => req.headers.get('Authorization')?.replace('Bearer ', '');

//检查用户的token
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
  rest.post<AuthForm>(`${API_URL}/register`, async (req, res, ctx) => {

    // 获取到url 中的参数
    const body = await req.json();

    const username = body.username as string;
    const password = body.password as string;

    // 组装数据
    const userFields = { username, password };

    // 写入用户注册数据
    await db.createUser(userFields);

    //return res(
    //  ctx.status(200),
    //  ctx.json({ userFields }
    //  )
    //);
    let user;
    try {
      user = await db.authenticate(userFields);
    } catch (error) {
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
  rest.post<AuthForm>(`${API_URL}/login`, async (req, res, ctx) => {

    const body = await req.json() as AuthForm;

    const username = body.username as string;
    const password = body.password as string;
    // 组装数据
    const userFields = { username, password };

    const user = await db.authenticate(userFields);
    return res(ctx.json({ user }));
  }),

  rest.get<AuthForm>(`${API_URL}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(ctx.json({ user: { ...user, token } }));
  }),
];

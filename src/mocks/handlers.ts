/*
* handlers： 主要为定义 API 逻辑的代码
*/
import { rest } from 'msw';

// 引入处理数据的文件
import * as db from './db';
// 导入开发URL
import { API_URL } from '../config';

// 设置延迟
// const sleep = t:number => new Promise(resolve => setTimeout(resolve, t));
interface RequestParams {
  username?: string,
  password?: string

}
export const handlers = [
  // 注册
  rest.post<RequestParams>(`${API_URL}/register`, async (req, res, ctx) => {

    // 获取到url 中的参数
    const body = await req.json() as RequestParams;

    const username = body.username as string;
    const password = body.password as string;

    // 组装数据
    const userFields = { username, password };


    await db.createUser(userFields);

    return res(
      ctx.status(200),
      ctx.json({ userFields }
      )
    );
  }),
  // 登陆
  rest.post<RequestParams>(`${API_URL}/login`, async (req, res, ctx) => {

    const body = await req.json() as RequestParams;

    const username = body.username as string;
    const password = body.password as string;
    //console.log(username, '123456****');

    // 组装数据
    const userFields = { username, password };

    const user = await db.authenticate(userFields);
    return res(ctx.json({ user }));
  }),

  rest.get('/user', (req, res, ctx) => {

    console.log(req);

    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {

      return res(

        ctx.status(403),

        ctx.json({
          errorMessage: 'Not authorized'
        })
      );
    }
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin'
      })
    );
  })
];

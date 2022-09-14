/*
* handlers： 主要为定义 API 逻辑的代码
* 在真实环境中，如果使用firebase这种第三方，auth服务的话，本文件不需要开发
*/
import { rest } from 'msw';

// 引入处理数据的文件
import * as db from './db';


// 导入开发URL
const apiUrl = process.env.REACT_APP_API_URL;

// 设置延迟
// const sleep = t:number => new Promise(resolve => setTimeout(resolve, t));
interface RequestParams {
  username?: string,
  password?: any

}
export const handlers = [
  // 注册
  rest.post<RequestParams>(`${apiUrl}/register`, async (req, res, ctx) => {

    // 获取到url 中的参数
    const body = await req.text();

    const params = new URLSearchParams(body);

    const username = params.get('username')!;
    const password = params.get('password')!;// 非空断言

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
  rest.post<RequestParams>(`${apiUrl}/login`, async (req, res, ctx) => {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const username = params.get('username')!;
    const password = params.get('password')!;// 非空断言
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

/* handlers： 主要为定义 API 逻辑的代码 */
import { rest } from 'msw';

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

  rest.post<RequestParams>(`${apiUrl}/register`, async (req, res, ctx) => {
    // 获取到url 中的参数
    const body = await req.text();

    const params = new URLSearchParams(body);

    const username = params.get('username')!;
    const password = params.get('password')!;// 非空断言

    // 组装数据 s
    const userFields = { username, password };
    console.log(userFields, '1111');
    //window.localStorage.setItem('localStorageKey', JSON.stringify(userFields));
    await db.createUser(userFields);
    //let user;
    //try {
    //  user = await db.authenticate(userFields);
    //} catch {
    //  return res(
    //    ctx.status(400),
    //    ctx.json({ status: 400, message: 'error.message' }),
    //  );
    //}
    //return res(ctx.json({ user }));
    return res(
      ctx.status(200),
      ctx.json({ userFields }
      )
    );
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

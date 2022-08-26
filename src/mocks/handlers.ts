/* handlers： 主要为定义 API 逻辑的代码 */
import { rest } from 'msw';
import { nanoid } from 'nanoid';// 设置唯一id

const register = [
  {
    id: nanoid(),
    usename: 'mengwei',
    password: '18150'

  },
  {
    id: nanoid(),
    usename: 'yulan',
    password: '1727'

  }
];

// 将初始化数据存入 window.localStorage

window.localStorage.getItem('register') || window.localStorage.setItem('register', JSON.stringify(register));

export const handlers = [
  //定义一个register的请求
  rest.get(`/register`, (req, res, ctx) => {
    const { usename } = req.params;
    const register = JSON.parse(window.localStorage.getItem('register') || '');
    const data = register.find((item: any) => item.usename === usename);
    if (data) {
      return res(ctx.status(200), ctx.json(data));
    } else {
      return res(ctx.status(500));
    }
  })
];

export const defaultHandlers = [];

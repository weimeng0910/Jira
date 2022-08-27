/* handlers： 主要为定义 API 逻辑的代码 */
import { rest } from 'msw';

export const handlers = [

  rest.post(`/login`, (req, res, ctx) => {

    console.log(req);

    sessionStorage.setItem('is-authenticated', 'true');

    return res(

      ctx.status(200)
    );
  }),
  rest.get(`/user`, (req, res, ctx) => {

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

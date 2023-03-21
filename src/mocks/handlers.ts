/**
 * @author meng
 * @version 1.0
 * @date 2022/11/23
 * handlers： 主要为定义 API 逻辑的代码
 */
import { rest, RestRequest } from 'msw';
import qs from 'qs';
import { customAlphabet } from 'nanoid/non-secure';

//导入jwt解密函数来获取token中的id
import { jwtDecodeGetId } from './core/util';
// 引入处理数据的文件
import * as db from './db';
// 导入开发URL
import { API_URL, projectDB, userDB, displayBoardDB } from '../config';
// 导入数据
import { bootstrap } from './bootstrap';
import { ResponseError, RequestBody, Project, DisplayBoard } from './type/handlersType';


/**
 * 初始化数据
 */

bootstrap();

/****************************************************
 *  用户数据处理
 *  @function getToken
 *  @param req
 *  @description 获得用户携带存在localstorega中的token
 */

export const getToken = (req: RestRequest) => req.headers.get('Authorization')?.replace('Bearer ', '');

/**
 *  @function getUser
 *  @param req
 *  @description 通过请求头中携带的token，并解密其中的id来检查用户是否存在
 *  @async async ,返回的都是Promise对象
 */

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
    // jwt函数解密ID，
    userId = jwtDecodeGetId(token);

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


/**
 * @todo 处理各种请求把数据返回前端
 */
export const handlers = [


  /**
   * @todo 注册
   * @returns data
   */
  rest.post<RequestBody>(`${API_URL}/register`, async (req, res, ctx) => {

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

  /**
   * @todo 登陆
   */
  rest.post<RequestBody>(`${API_URL}/login`, async (req, res, ctx) => {


    const body = await req.json() as RequestBody;

    const username = body.username as string;
    const password = body.password as string;
    // 组装数据
    const userFields = { username, password };

    const user = await db.authenticate(userFields);

    return res(
      //延迟两秒返回数据
      //ctx.delay(5000 * 60),
      ctx.json({ user }));
  }),

  /**
   * @todo 响应post请求用户列表数据
   */

  rest.post<RequestBody>(`${API_URL}/users`, async (_req, res, ctx) => {
    //调用写入数据的函数
    const userData = await db.ScreensUserData(userDB);
    if (userData) {
      return res(ctx.status(200), ctx.json(userData));
    }
    return res(ctx.status(200), ctx.json(userData));

  }),

  /**
   * @todo 携带前瑞token请求
   */

  rest.get<RequestBody>(`${API_URL}/me`, async (req, res, ctx) => {
    const user = await getUser(req);
    const token = getToken(req);
    return res(
      //延迟
      //ctx.delay(1000 * 60),

      ctx.json({ user: { ...user, token } })
    );

  }),

  /****************************************************
    * 响应各种project项目数据请求
    * @todo 响应get请求获得项目数据
    */

  rest.get<Partial<Project>>(`${API_URL}/projects`, async (req, res, ctx) => {

    // 获得前瑞发送的参数
    const personId: string = req.url.searchParams.get('personId')!;
    const name: string = req.url.searchParams.get('name')!;

    //组装数据
    const query = { personId, name };

    //调用写入数据的函数
    const projectData = await db.ScreensProjectsData(projectDB, query);
    if (projectData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(projectData)
      );
    }
    return res(ctx.status(500));

  }),
  /**
   * @todo 响应post请求获得项目数据
   */

  rest.post<Partial<Project>>(`${API_URL}/projects`, async (req, res, ctx) => {

    // 获得前瑞发送的参数,

    const body = await req.json();


    const addProject = qs.parse(body);
    //const { name, organization, personId } = addProject;
    //类型守卫
    const name: string = typeof addProject.name === 'string' ? addProject.name : '';

    const organization: string = typeof addProject.organization === 'string' ? addProject.organization : '';
    const personId: string = typeof addProject.personId === 'string' ? addProject.personId : '';
    console.log(addProject, 'add001');

    const nanoid = customAlphabet('1234567890', 10);
    //组装数据
    const addProjectItem = { created: Date.now(), id: Number(nanoid()), name, organization, personId: Number(personId), pin: false };




    //调用写入数据的函数
    const projectData = await db.addProjectsData(projectDB, addProjectItem);

    return res(
      //延迟
      //ctx.delay(1000 * 60),

      ctx.json({ projectData })
    );



  }),
  /**
  * @todo 响应put请求
  */

  rest.put<Partial<Project>>(`${API_URL}/projects/:id`, async (req, res, ctx) => {

    // 获得前瑞发送的参数
    const { id } = req.params;

    const updates: Partial<Project> = await req.json();

    const projectData = await db.projectsUpdata(projectDB, id as string, updates);


    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ projectData })
    );


  }),

  /**
  * @todo 响应delete请求
  */

  rest.delete<Partial<Project>>(`${API_URL}/projects/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const projectData = await db.projectDetele(projectDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json({ projectData })
    );
  }),
  /**
   * @todo 根据id请求project
   */

  rest.get<Partial<Project>>(`${API_URL}/project/:id`, async (req, res, ctx) => {
    // 获得前瑞发送的参数
    const { id } = req.params;
    const projectData = await db.ScreensProjectData(projectDB, id as string);
    return res(
      //延迟
      //ctx.delay(1000 * 60),
      ctx.json(projectData)
    );
  }),

  /****************************************************
   * 响应各种displayBoard项目数据请求
   * @todo 响应get请求获得项目数据
   */
  rest.get<DisplayBoard>(`${API_URL}/displayBoards`, async (_req, res, ctx) => {

    //调用写入数据的函数
    //const projectData = [{ name: '待完成' }, { name: '开发中' }, { name: '完成' }];
    const projectData = await db.ScreensDisplayBoards(displayBoardDB);
    if (projectData) {
      return res(
        //延迟两秒返回数据
        //ctx.delay(6000),
        ctx.status(200),
        ctx.json(projectData)
      );
    }
    return res(ctx.status(500));

  }),
];

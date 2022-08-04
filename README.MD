# Webpack：TypeScript + Jest + Sass + ESLint

#🌈 🚀 React18 Hook + typescript4 + Jest 🚀

# 前言

从零配置基于 webpack5.74.0 搭建 React 应用模板，方便快速的进行开发，React（React Hook + React-router + Axios ）ESLint 等项目开发规范等。

# 技术栈

涉及的技术栈均采用当前最新的版本和语法：

-   使用 Webpack5.7.1 构建项目（不使用 create-react-app、umi 等脚手架）；
-   使用 Babel8 配置转换 ES6、React、Mobx 等语法；
-   使用 TypeScript 进行严格类型检查；
-   使用 ESLint 代码规范校验，Prettier stylelint 代码自动格式化工具，EditorConfig 代码风格统一工具
-   React 版本 V18.0.0，全部采用函数化 Hooks 特性开发项目组件；
-   采用 React-router6 工具 配置项目路由；
-   采用 Mobx5 + Hooks 实现项目数据状态管理；
-   封装 Axios 库实现与后台 http 请求交互；

## 目录结构

```
├── config                  // webpack配置
│   ├── webpack.common.js   // webpack通用配置
│   ├── webpack.dev.js      // webpack开发环境配置
│   └── webpack.prod.js     // webpack生产环境配置
│   └── paths.js            // webpack路径配置
├── dist                    // 打包输出目录
├── public                  // 项目公开目录
├── src                     // src开发目录
│   ├── public              // 静态资源
│   ├── components          // 公共组件
│   ├── routers             // 项目路由配置
│   ├── views               // 具体业务页面
│   ├── services            // axios服务等相关
│   ├── redux               // 全局公共 mobx store
│   ├── utils               // 工具库/通用函数
│   ├── typings.d.ts        // css modules 类型声明文件
│   ├── index.html          // 入口html页面
│   ├── index.html          // 入口html页面
│   └── index.tsx           // 项目入口文件
├── .babel.config.js         // babel配置,依赖什么样的插件
├── .browserslistrc         // 浏览器过滤规则配置,babel依赖这个文件，同样css也依赖
├── .editorconfig            // 项目格式配置
├── .eslintrc.json          // ESLint配置
├── .eslintignore           // ESLint配置屏蔽不需要检测的文件或目录
├── .prettierrc.js          // Prettier 代码自动格式化配置
├── .prettierignore         // Prettier 代码自动格式化配置屏蔽不必要的文件
├── .editorconfig            // EditorConfig 代码风格统一配置
├── .jest.config.js          // jest代码测试配置
├── .stylelintrc.js         // stylelint是CSS 规范校验工具配置
├── .gitignore              // git 忽略配置
├── .postcssrc.js           // postcss配置,依赖什么样的插件
├── tsconfig.json            // typescript配置
├── package.json            // 依赖包配置
└── README.md               // 项目说明


```

### 本地 node 服务器

### 配制 json-serve

优点：
1、配制简单,json-server 可以瞬间起动 REST API Server 2.增删改查真实模拟

缺点：与接口管理工具相比，无法随后端 API 的修改而自动修改

```

yarn add json-server

```

## 使用 dotenv 加载.env---全局环境变量

dotenv 是一个零依赖模块，它将环境变量从 .env 文件加载到 process.env 中。dotenv 提供许多的方法，最常用的是 dotenv.config()。
最常用的是配制.env 文件，可以配制上线所需要的 API 接口的 URL

一、 .env 文件说明

.env --- 全局默认配置文件，在所有的环境中被载入，当你指定了环境，它也会合并,并且优先级大于.env，没有指定环境时先找它

.env.development --- 指定开发环境的配置文件

.env.production --- 指定生产环境的配置文件，当 build 运行会触发此文件

先在.env 文件中声明环境变量

全局默认配置文件，无论什么环境都会加载合并

```
REACT_APP_API_URL=online.com

```

在 webpack.common.js，内容如下

```
const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv()
    ]
}
```

然后无论你想在哪里使用变量.env 写

```
process.env.REACT_APP_YOURVARIABLE
```

无需导入 dotenv. 它已经在 webpack.common.js

### dotenv 加载优先级

.env 全局默认配置文件，无论什么环境都会加载合并
.env.development 开发环境的全局配置文件
dotenv.config() 方法可以接收一个 option 对象，其中 option.path 代表我们期望加载的.env\*文件路径。
需要注意的是，只要一个环境变量已经被设置过，dotenv 就不会修改它 。也就是说，dotenv 始终以先加载到的变量声明为更高优先级

我们期望的效果是，.env.local 文件中定义的环境变量获得最高优先级，.env.development 其次，.env 中的通用配置优先级最低，由此我们可以在 config/env.js 中进行如下的处理：

```
// config/env.js

const path = require("path");
const fs = require("fs");
const dotEnv = require("dotenv");

// 先构造出.env*文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const pathsDotenv = resolveApp(".env");

// 按优先级由高到低的顺序加载.env文件
dotEnv.config({ path: `${pathsDotenv}.local` })  // 加载.env.local
dotEnv.config({ path: `${pathsDotenv}.development` })  // 加载.env.development
dotEnv.config({ path: `${pathsDotenv}` })  // 加载.env

// 打印一下此时的process.env
console.log(process.env.NAME);
console.log(process.env.AGE); // 20
console.log(process.env.COUNTRY); // China
console.log(process.env.LOCAL_ENV); // local
```

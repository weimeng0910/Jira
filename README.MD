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

```

yarn add -D dotenv-webpack

```

dotenv 是一个零依赖模块，它将环境变量从 .env 文件加载到 process.env 中。dotenv 提供许多的方法，最常用的是 dotenv.config()。
最常用的是配制.env 文件，可以配制上线所需要的 API 接口的 URL,凡是在 .env 設置的全局变量，一律都是使用 process.env.XXX 將其读取，這邊唯一要注意的是 .env 設置的全局变量都是属于字符串，在某些情況下我们得自己處理转型的问題。

一、 .env 文件说明

.env --- 全局默认配置文件，在所有的环境中被载入

.env.development --- 指定开发环境的配置文件

.env.production --- 指定生产环境的配置文件，当 build 运行会触发此文件

二、在根目录下建立两个文件，我们在这里只建立.env 和.env.development 两个文件

```
 webpack-demo/
 │
+└─── .env
+└─── env.development

```

先在.env 文件中声明环境变量，然后无论你想在哪里使用变量 .env 都可用下面的方式

```
process.env.REACT_APP_YOURVARIABLE
```

全局默认配置文件，无论什么环境都会加载合并,我们在这里设置上线运行时的 URl 地址

```
REACT_APP_API_URL=online.com

```

在.env.development 文件中设置开发时的 URl 地址，参考如下

```
REACT_APP_API_URL=http://localhost:5000

```

三.将全局变量文件在 github 中隐藏

目前，我们只是将全局变量的 API 请求地址写到.env 文件内，为了达到隐藏目的，可将其新增至.gitignore 内，这样可以避免 GitHub 内存在任何型态的全局变量

```
.env
.env.development

```

四、dotenv-webpack 可传参选项
可参考 dotenv-webpack Options 可传参列表，以下为常用参数配置：
path: String
配置全局变理位置，默认为./.env

systemvars:Boolean
充许加载所有系统变量

在 webpack.common.js，内容如下

```
const Dotenv = require("dotenv-webpack");

module.exports = {
  plugins: [
    new Dotenv({
      path:
        process.env.NODE_ENV === "development"
          ? "./.env.development"
          : "./.env.production",
      systemvars: true, // 允許讀取 process.env 下的任意系統變量
    }),
  ],
};
```

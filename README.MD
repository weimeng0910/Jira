# Webpack：TypeScript + Jest + Sass + ESLint

### 初始化项目
**初始化package.json**
首先，我们需要创建一个 npm 项目，但是我使用 yarn来安装,yarn的一些优点:

安装：yarn init -y


# Webpack 
yarn add webpack webpack-cli --save-dev

创建多个 webpack 配置，一个用于开发，另一个用于构建生产

# TypeScript

创建tsconfig.json

yarn add --save-dev typescript ts-loader

# SASS
安装 sass 和 loader：

yarn add --save-dev sass-loader style-loader css-loader node-sass

安装 MiniCssExtractPlugin。我们需要这个插件来生成单独的 CSS 文件到 dist 文件夹。

yarn add --save-dev mini-css-extract-plugin

# Webpack 插件

yarn add clean-webpack-plugin copy-webpack-plugin fork-ts-checker-webpack-plugin html-webpack-plugin --save-dev

# Jest
yarn add --save-dev jest ts-jest
运行：yarn ts-jest config:init
创建一个规范文件夹，并在那里创建任何 *.spec.ts 文件。Jest 会找到它并运行单元测试。

要启动测试，您需要运行一个小命令：

npx jest
将其添加到package.json文件中的 npm 脚本中：
“test”: “npx jest”

您的测试应位于 spec 文件夹中，名称格式为*.spec.ts。

# ESLint

yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev
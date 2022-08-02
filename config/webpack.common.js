/* eslint-disable @typescript-eslint/no-var-requires */
const resolveApp = require("./paths");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const { merge } = require("webpack-merge");

//导入其它的配置
const prodConfig = require("./webpack.prod");

const devConfig = require("./webpack.dev");

//定义对象保存base

const commonConfig = {
  // 入口文件
  entry: "./src/index.ts",
  // mode: "development",
  devtool: "source-map",
  optimization: {
    usedExports: true,
  },
  // 输出
  output: {
    // 文件名称
    filename: "[name].[contenthash].js",
    // 输出目录
    path: resolveApp("./dist"),
    // 每次编译输出的时候，清空dist目录 - 这里就不需要clean-webpack-plugin了
    clean: true,
    // 所有URL访问的前缀路径
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
          options: {
            // disable type checker - we will use it in fork plugin
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    // 定义了扩展名之后，在import文件时就可以不用写后缀名了，会按循序依次查找
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css", ".less"],
    // 设置链接
    alias: {
      // 注意resolve方法开始的查找的路径是/
      "@": resolveApp("./src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "News System",
      // HTML模板文件
      template: resolveApp("./public/index.html"),

      filename: "index.html",
      // 收藏夹图标
      favicon: resolveApp("./public/logo.ico"),
    }),

    new friendlyErrorsWebpackPlugin(),
  ],
};
module.exports = env => {
  const isProduction = env.isProduction;
  //合并配置信息
  const config = isProduction ? prodConfig : devConfig;

  const mergeConfig = merge(commonConfig, config);

  return mergeConfig;
};

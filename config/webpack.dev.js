/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const resolveApp = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
//const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

// dev环境下相关配置
module.exports = {
  target: "web", //防止和.browserslistrc文件配制冲突
  // 指定环境
  mode: "development",
  // 输出source-map的方式，增加调试。eval是默认推荐的选择，build fast and rebuild fast！
  devtool: "inline-cheap-source-map",
  // 本地服务器配置
  devServer: {
    hot: true,
    static: "./dist",
    // 启动GZIP压缩
    compress: true,
    // 设置端口号
    port: 3000,
    open: true,
    historyApiFallback: true,
    static: {
      directory: resolveApp("public"),
    },
    // 代理请求设置
    proxy: {
      "/api": {
        // 目标域名
        target: "http://xxxx.com:8080",
        // 允许跨域了
        changeOrigin: true,
        // 重写路径 - 根据自己的实际需要处理，不需要直接忽略该项设置即可
        // pathRewrite: {
        //   // 该处理是代码中使用/api开头的请求，如/api/userinfo，实际转发对应服务器的路径是/userinfo
        //   "^/api": "",
        // },
        // https服务的地址，忽略证书相关
        secure: false,
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    // new ESLintPlugin({
    //   extensions: ["js", "jsx", "ts", "tsx"],
    // }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
      exclude: "node_modules",
      context: "src",
    }),
    //new ReactRefreshWebpackPlugin(),
  ],
};

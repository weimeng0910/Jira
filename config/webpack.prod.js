/* eslint-disable @typescript-eslint/no-var-requires */
const resolveApp = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "",
    path: resolveApp("./dist"),
    // 打包前清空输出目录
    clean: true,
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
  ],
};

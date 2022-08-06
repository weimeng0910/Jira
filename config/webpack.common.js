/* eslint-disable @typescript-eslint/no-var-requires */
const resolveApp = require('./paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

//获取当前是开发模式还是生产模式
const isDevelopment = process.env.NODE_ENV !== 'production';

// 載入 dotenv-webpack
const Dotenv = require('dotenv-webpack');

//获取Dotenv里配制全局配制文件
const pathsDotenv = resolveApp('.env');

//导入其它的配置
const prodConfig = require('./webpack.prod');

const devConfig = require('./webpack.dev');

//定义对象保存base

const commonConfig = {
    // 入口文件
    entry: './src/index.tsx',
    // mode: "development",
    devtool: 'source-map',
    optimization: {
        usedExports: true
    },
    // 输出
    output: {
        // 文件名称
        filename: 'js/[name].[contenthash:8].js',
        // 输出目录
        path: resolveApp('./dist')
        // publicPath: "../",
        // clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
                //use: ['babel-loader?optional=runtime&cacheDirectory', 'astroturf/loader']
            },

            {
                test: /\.(ts|tsx?)$/,
                exclude: /node_modules/,
                // use: ["ts-loader"],
                use: [{ loader: 'ts-loader', options: { compilerOptions: { noEmit: false } } }]
            },
            {
                test: /\.css$/i,

                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.s[ca]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },

            {
                test: /\.styl$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    {
                        loader: 'stylus-loader'
                    }
                ]
            },
            // 图片文件引入
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 限制于 8kb
                    }
                },
                // 只解析src目录
                include: resolveApp('./src')
            },
            {
                test: /\.txt/,
                type: 'asset/source'
            }
        ]
    },
    resolve: {
        // 定义了扩展名之后，在import文件时就可以不用写后缀名了，会按循序依次查找
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.less'],
        // 设置链接
        alias: {
            // 注意resolve方法开始的查找的路径是/
            '@': resolveApp('./src')
        }
    },
    plugins: [
        new Dotenv({
            // 判断是不是开发环境，如果是?路径就是.env.development，不是就是.env
            path: isDevelopment ? `${pathsDotenv}.development` : pathsDotenv,
            systemvars: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new HtmlWebpackPlugin({
            title: 'Jira System',
            // HTML模板文件
            template: resolveApp('./public/index.html'),

            filename: 'index.html',
            // 收藏夹图标
            favicon: resolveApp('./public/logo.ico')
        }),

        new friendlyErrorsWebpackPlugin()
    ]
};
module.exports = env => {
    const isProduction = env.isProduction;
    //合并配置信息

    const config = isProduction ? prodConfig : devConfig;

    const mergeConfig = merge(commonConfig, config);

    return mergeConfig;
};

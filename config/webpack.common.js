const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pathName = path.join(__dirname, '..');
module.exports = {
    entry: {
        app: path.join(__dirname, '..', '/src/index.js'),
        vendor: ['react', 'react-router-dom', 'react-redux', 'redux'] //提取react模块作为公共的js文件
    },
    output: {
        path: path.resolve(pathName, 'dist/'),
        // path: __dirname,   webpack 4.0前
        filename: '[name].index.js',
        //所有资源的基础路径，而且一定是/结尾
        publicPath: '/',
        chunkFilename: '[name].[chunkhash:5].chunk.js',    // 添加 chunkFilenamemodule
    },

    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },

    module: {
        /**
         * 安装babel-loader  babel-core babel-preset-react
         *
         */
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        // loader: 'babel-loader',
                        loader: "babel-loader?cacheDirectory=true", // 使用cache提升编译速度
                        /*  options: {
                          presets: ["react", "env"],
                          plugins: ["transform-object-rest-spread"] // ...展开符号插件安装
                        } */
                    },
                ],
                exclude: [path.resolve(path.join(__dirname, '..'), 'node_modules/')],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path]-[name]-[local]-[hash:base64:6]'
                        }
                    }]
                }),

                /*   use: ExtractTextPlugin.extract({
                       fallback: "style-loader",
                       use:  {
                           loader : 'css-loader',
                           options: {
                               module        : true,
                               localIdentName: '[path]-[name]-[local]-[hash:base64:6]',
                           },
                       },
                   }),*/
                /*  use    : [
                      'style-loader',
                      {
                          loader : 'css-loader',
                          options: {
                              module        : false,
                              localIdentName: '[path]-[name]-[local]-[hash:base64:6]',
                          },
                      },
                  ],*/
                exclude: [
                    path.resolve(path.join(__dirname, '..'), 'node_modules/'),
                    // path.resolve(path.join(__dirname, '..'), 'src/css/'),
                ],
            },
            /* {
                 test   : /\.css$/,
                 use    : ['style-loader', 'css-loader'],
                 include: [
                     path.resolve(path.join(__dirname, '..'), 'node_modules/'),
                     // path.resolve(path.join(__dirname, '..'), 'src/css/'),

                 ],
             },*/
           /* {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },*/
           /* {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },*/
             {
                 test: /\.(jpg|png|gif|jpeg|svg)$/,
                 use : [
                     {
                         loader : 'file-loader',
                         options: {
                             limit: 10000,
                             name : 'static/img/[name]_[hash:8].[ext]',
                          /*   publicPath:'/',
                             outputPath:"images"*/
                         },
                     },
                 ],
             },
        ]
    },
};

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
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
                test: /(\.js|\.jsx)$/,
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
            /*   {
                   test: /-m\.css$/,
                   use: ExtractTextPlugin.extract({
                       fallback: "style-loader",
                       use: [
                           {
                               loader: 'css-loader',
                               options: {
                                   modules: true,
                                   localIdentName: '[path][name]-[local]-[hash:base64:5]'
                               }
                           }
                       ]
                   })
               },
               {
                   test: /^((?!(-m)).)*\.css$/,
                   use: ExtractTextPlugin.extract({
                       fallback: 'style-loader',
                       use: 'css-loader'
                   })
               },
   */
           /* {//ES6、JSX处理
                test:/(\.jsx)$/,
                exclude: /node_modules/,
                loader:'babel-loader',
                query:
                    {
                        presets:["env", "react"],
                        plugins: [
                            [
                                "import",
                                {libraryName: "antd", style: 'css'}
                            ] //antd按需加载
                        ]
                    },
            },*/
          /*  {//antd样式处理
                test:/\.css$/,
                exclude:/src/,
                use:[
                    { loader: "style-loader",},
                    {
                        loader: "css-loader",
                        options:{
                            importLoaders:1
                        }
                    }
                ]
            },*/
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path]-[name]-[local]-[hash:base64:6]',
                        }

                    }, {
                        loader: 'postcss-loader',
                        options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                            plugins: (loader) => [
                                require('postcss-import')({root: loader.resourcePath}),
                                require('autoprefixer')(), //CSS浏览器兼容
                                require('cssnano')()  //压缩css
                            ]
                        }
                    }]
                }),
                exclude: [
                    path.resolve(path.join(__dirname, '..'), 'node_modules/')
                    // path.resolve(path.join(__dirname, '..'), 'src/css/'),
                ],
            },
            {
                test: /\.(less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true, localIdentName: '[path]-[name]-[local]-[hash:base64:6]', importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                                plugins: (loader) => [
                                    require('postcss-import')({root: loader.resourcePath}),
                                    require('autoprefixer')(), //CSS浏览器兼容
                                    require('cssnano')()  //压缩css
                                ]
                            }
                        }]
                }),
                /*  use: [
                      'style-loader',
                      { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
                      {
                          loader: 'postcss-loader',
                          options: {           // 如果没有options这个选项将会报错 No PostCSS Config found
                              plugins: (loader) => [
                                  require('postcss-import')({ root: loader.resourcePath }),
                                  require('autoprefixer')(), //CSS浏览器兼容
                                  require('cssnano')()  //压缩css
                              ]
                          }
                      }
                  ]*/
            },

            /*  {
                  test: /\.less$/,
                  use: ['style-loader',
                      {
                          loader: 'css-loader',
                          options: {
                              module: true,
                              // localIdentName: '[name]-[local]-[hash:base64:6]'
                          }
                      },
                      'less-loader'
                  ],
                  exclude: [
                      // path.resolve(path.join(__dirname, '..'), 'node_modules/')
                      // path.resolve(__dirname, 'src/common')
                  ]
              },*/
            /*     {
                     test: /\.less$/,
                     use: ['style-loader',
                         {
                             loader: 'css-loader',
                             options: {
                                 module: true,
                                 localIdentName: '[name]-[local]-[hash:base64:6]'
                             }
                         },
                         'less-loader'
                     ]

                 },*/
            {
                test: /\.(jpg|png|gif|jpeg|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'static/img/[name]_[hash:8].[ext]',
                            // localIdentName: '[path]-[name]-[local]-[hash:base64:6]',
                            /*   publicPath:'/',
                               outputPath:"images"*/
                        },
                    },
                ],
            },
        ]
    },
};

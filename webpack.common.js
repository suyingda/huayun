const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Production'
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        // path: __dirname,   webpack 4.0前
        filename: '[name].index.js',
        //所有资源的基础路径，而且一定是/结尾
        publicPath: './',
        chunkFilename: '[name].[chunkhash:5].chunk.js',    // 添加 chunkFilename
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

                exclude: [path.resolve(__dirname, 'node_modules/')],
            }

        ]
    },
};
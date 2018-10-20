const  Proxy =require('./proxy-target.js')
console.log(Proxy,'Proxy');
module.exports={
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // compress: true,
        open: false,
        port:1000,
        /*   proxy: { // proxy URLs to backend development server
               '/huayun/': 'http://172.254.68.140:8081'
           },*/
        proxy: {
            "/project/*":  Proxy.target,
            // changeOrigin: true
            // },
            "/admin/*": {
                target: 'http://172.254.68.140:8081',
                // changeOrigin: true
            }
        },
        host: '::', // can be overwritten by process.env.HOST
        // contentBase: "./src/common",
        //服务器打包后输出的路径。
        // publicPath: '/',
        historyApiFallback: true,
        compress:true,// 服务器压缩
        // mode     : 'development',//设置环境依赖  4.0报错,
        // inline: true, // 文件改变自动刷新页面
    }
}
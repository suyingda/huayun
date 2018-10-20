/*
const http = require('http');

var server =http.createServer(function(req,res){
    switch(req.url){
        case './dist/index':
            break;
    }
});

server.listen(8001)*/
var http = require('http');
var fs   = require('fs');//引入文件读取模块
const express = require('express');
const proxy = require('http-proxy-middleware');//引入代理中间件
const app = express();
const path = require('path');
var documentRoot = './dist';
const proxyTargetFile = path.join(__dirname, '.', 'proxy-target.js');
fs.watch(proxyTargetFile, {
    persistent: true, // 设为false时，不会阻塞进程。
    recursive: false
}, function(event, filename) {
    if (event === 'change') {
        // proxyConfig.target = '1111';
    }
});

//需要访问的文件的存放目录
//  引入fs文件系统模板
var fs = require('fs')
//   创建工程文件
var projectData = {
    //   工程名
    name: 'projectName',
    // 工程文件数组
    fileData: [{
        name: 'js',
        type: 'dir'
    }, {
        name: 'css',
        type: 'dir'
    }, {
        name: 'images',
        type: 'dir'
    }, {
        name: 'fonts',
        type: 'dir'
    }, {
        name: 'index.html',
        type: 'file',
        //   默认写入文件内容
        content: '<!DOCTYPE html> \n<html lang="en">\n<head> \n\t<meta charset="UTF-8">\n\t<title>Title</title>\n</head>\n<body>\n</body>\n</html> '
    }]
}
// 判断工程文件是否存在
if (!projectData) {
    //判断工程文件
    if (projectData.name) {
        //  如果存在创建工程文件
        fs.mkdirSync(projectData.name)
        //   获取工程文件所有子文件数组
        var fileData = projectData.fileData
        //　判断工程文件数组是否存在　且是否是个数组
        if (fileData && fileData.forEach) {
            //遍历工程文件数组
            fileData.forEach((item) => {
                var content = item.content || ''
                var path = projectData.name + "/" + item.name
                switch (item.type) {
                    case 'dir':
                        //　创建文件夹
                        fs.mkdirSync(path)
                        break
                    case 'file':
                        //　创建文件
                        fs.writeFileSync(path, content)
                        break
                    default :
                        break
                }
            })
        }
    }
}

/*app.get('*', function (req, res) {
    res.render({html});
});*/

var server = http.createServer(function (req, res) {

    var url = req.url === '/' ? '/index.html' : req.url;
    //客户端输入的url，例如如果输入localhost:8888/index.html
    //那么这里的url == /index.html

    var file = documentRoot + url;
    // var file = './dist/index.html';
    // console.log(req.url, 123);
    //E:/PhpProject/html5/websocket/www/index.html

    fs.readFile(file, function (err, data) {console.log(file,'文件路径')
        /*
            一参为文件路径
            二参为回调函数
                回调函数的一参为读取错误返回的信息，返回空就没有错误
                二参为读取成功返回的文本内容
        */
        if (err) {
            console.log(err,'error!进入服务端请求')
            fs.readFile('./dist/index.html', function (err, data) {console.log(file,'文件路径')
                if (err) {
                    res.writeHeader(404, {
                        'content-type': 'text/html;charset="utf-8"',
                    });
                    res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
                    res.end();
                } else {
                    res.writeHeader(200, {
                        'content-type': 'text/html;charset="utf-8"',
                    });
                    res.write(data);//将index.html显示在客户端
                    res.end();
                }
            });
          /*  res.writeHeader(404, {
                'content-type': 'text/html;charset="utf-8"',
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();*/
        } else {
            res.writeHeader(200, {
                // 'content-type': 'text/html;charset="utf-8"',
            });
            res.write(data);//将index.html显示在客户端
            res.end();

        }

    });

}).listen(8001);

console.log('start server successful');
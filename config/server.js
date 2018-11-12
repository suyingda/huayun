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



// #!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');
 

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}
wsServer.on('request', function(request) { 
    if (!originIsAllowed(request.origin)) {
      request.reject();
    //   console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    // console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) { 
        if (message.type === 'utf8') {
            // console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data+'servire');
        }
        else if (message.type === 'binary') {
            // console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        // console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

console.log('start server successful');
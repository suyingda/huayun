import Axios from 'axios'
// const Api ="http://172.253.32.131:9090/"
// const Api = "http://172.253.32.131:9090/";
const Api = "http://172.254.68.140:8081";
const querystring = require('querystring');

var Qs = require('qs');
const obj = {
   // "Content-Type": "text/plain;charset=UTF-8",
   // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "auth.sysid":"1001",
    "Content-Type": "application/json;charset=UTF-8",
    "auth.token":"eyJhbGciOiJIUzI1NiJ9.eyJlcHQiOjYwMCwiZXhwIjoxNTM2MDU3NTc0LCJpc3MiOiJjbXMiLCJ1c2VyQWNjb3VudCI6ImxpYW5neWluZyIsInNvdXJjZSI6InBvcnRhbCIsInVzZXJOYW1lIjoi5qKB6I65IiwidXNlcklkIjoibGlhbmd5aW5nIiwiX3VzZXJJZCI6IlVSMTAwMDAwNzAzOCIsIl91aWRfIjoibGlhbmd5aW5nIiwiYXVkIjoiMTAwMSIsImF0cCI6ImNtc19sb2dpbiJ9.MiaOobjGP_1cXzNCEkmnf6NWVDZ86g20t6T1da4w-G0","auth.sysid": 1001,
    "auth.permit": "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ",

}
// 添加请求拦截器
const service = Axios.create({
    timeout:30000,
    withCredentials:true
});
Axios.interceptors.request.use(config => {
     Object.assign(config.headers, obj);
     console.log(obj,'obj')
    // config.data = Qs.stringify(config.data);
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error,'ssd')
    return Promise.reject(error);
});


// 添加响应拦截器
service.interceptors.response.use(function (response) {
    console.log(response, '收到数据')
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
/*Axios.interceptors.request.use(config => {
    Object.assign(config.headers, {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'auth.token': 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbXMiLCJ1c2VyQWNjb3VudCI6ImxpYW5neWluZyIsInVzZXJOYW1lIjoi5qKB6I65IiwidXNlcklkIjoiVVIxMDAwMDA3MDM4IiwiX3VzZXJJZCI6IlVSMTAwMDAwNzAzOCIsIl91aWRfIjoiVVIxMDAwMDA3MDM4IiwiYXVkIjoiMTAwMSIsImVwdCI6NTI1NjAwLCJleHAiOjE1Njc0OTA5MDEsImF0cCI6InNlY3VyaXR5In0.iBx8ac2IKZHXkIu6ZpUuL4l4AQBBGvXJxxd1Ot1-6PM',
        "auth.permit": "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ",
        "auth.sysid": "1001",
        "Accept": "*!/!*",
        // "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Connection": "keep-alive",
        "Content-Length": 51,
        "Content-Type": "text/plain;charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36"
    });
    return config;
});*/

/*
function getUserAccount() {
    return axios.get('http://172.254.68.140:8081/');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}
*/

/*export const path = {
    user: {
        registerPost(prjected) {
            return request('/admin/dict/listDictItem', prjected);
        },
        test2(pageNo, pageSize, state) {
            return request('project/projectApi/listProject', {pageNo, pageSize, state});
        },
    }
}*/
// 发送 POST 请求
Axios({
    method: 'post',
    url: '/admin/user/info',
    headers:{
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },

}).then((res)=>{
    console.log(res,'故宫')
});
export const arequest = function (url, params) {
    return new Promise((resolve, reject) => {
        /*    fetch(url,obj).then((re)=>{
                console.log(re,'shuzhu')
            }).catch((v)=>{
                console.log(v,'slfjsdslksjflsjfsdslkdsjlkdsjfdlkfj')
            })*/
        Axios.post(url, {'params': params}).then(function (response) {
                console.log(response, 'response');
            })
            .catch(function (error) {
                console.log(error, '未能拿到接口数据');
            });
        /*  axios.post(Api + url, params).then(res => {
              if (res) {
                  // return res.json();
                  return res.data;
              } else {
                  throw 'network error';
              }
          }).then(json => {
                  resolve(json);

              })
              .catch(err => {
                  Toast.fail(err.response.data.msg, 3);

                  console.log(err, 'catch报错');
              });*/
    });
}

/*
console.log(request())
axios.all([getUserAccount(), getUserPermissions()])
    .then(axios.spread(function (acct, perms) {
        // 两个请求现在都执行完成
    }));*/

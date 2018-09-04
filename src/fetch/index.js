import Axios from 'axios'
// const Api ="http://172.253.32.131:9090/"
// const Api = "http://172.253.32.131:9090/";
const Api = "http://172.254.68.140:8081";
const querystring = require('querystring');
const obj = {
   // "Content-Type": "text/plain;charset=UTF-8",
   // "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "auth.sysid":"1001",
    "Content-Type": "application/json;charset=UTF-8",
    "auth.token":"eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbXMiLCJ1c2VyQWNjb3VudCI6ImxpYW5neWluZyIsInVzZXJOYW1lIjoi5qKB6I65IiwidXNlcklkIjoiVVIxMDAwMDA3MDM4IiwiX3VzZXJJZCI6IlVSMTAwMDAwNzAzOCIsIl91aWRfIjoiVVIxMDAwMDA3MDM4IiwiYXVkIjoiMTAwMSIsImVwdCI6NTI1NjAwLCJleHAiOjE1Njc2MDA4NTgsImF0cCI6InNlY3VyaXR5In0.K4wsXtuWJ2obZ3yCvFp2G7Guk71d5T32qlAvwPhwbDo",
    "auth.permit": "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ",

}
// 添加请求拦截器
const service = Axios.create({
    timeout:30000,
    withCredentials:true
});
Axios.interceptors.request.use(config => {

     Object.assign(config.headers, obj);
    // config.data = Qs.stringify(config.data);
    return config;
}, function (error) {
    // 对请求错误做些什么
    console.log(error,'ssd')
    return Promise.reject(error);
});


// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    console.log(response, '收到数据')
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


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
/*Axios({
    method: 'post',
    url: '/admin/user/info',
    headers:{
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },

}).then((res)=>{
    console.log(res,'故宫')
});*/
export const request = function (url, params) {
    return new Promise((resolve, reject) => {
        Axios.post(url, {'params': params}).then(function (response) {
                console.log(response, 'response');
                return resolve(response)
            })
            .catch(function (error) {
                console.log(error, '未能拿到接口数据');
                return reject(error)
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

import axios from 'axios'
// const Api ="http://172.253.32.131:9090/"
const Api = "http://172.253.32.131:9090/";
const querystring = require('querystring');
const obj = {
    "auth.permit": "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ",
    "auth.sysid": "1001"
}
axios.interceptors.request.use(config => {
    Object.assign(config.headers, {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'auth.token': 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjbXMiLCJ1c2VyQWNjb3VudCI6ImxpYW5neWluZyIsInVzZXJOYW1lIjoi5qKB6I65IiwidXNlcklkIjoiVVIxMDAwMDA3MDM4IiwiX3VzZXJJZCI6IlVSMTAwMDAwNzAzOCIsIl91aWRfIjoiVVIxMDAwMDA3MDM4IiwiYXVkIjoiMTAwMSIsImVwdCI6NTI1NjAwLCJleHAiOjE1NjYwMTA5NzIsImF0cCI6InNlY3VyaXR5In0.ealFiXEhmXmUgv_cSZZJp-g8vVZxILOV0UxQ-3MklbM',
        "auth.permit": "nGdeacZmW3E1XM9Wi5alwcMUCKeVDZ",
        "auth.sysid": "1001",
        "Accept": "*/*",
        // "Accept-Encoding": "gzip, deflate",
        "Accept-Language": "zh-CN,zh;q=0.9"
    });
    return config;
});

function getUserAccount() {
    return axios.get('http://172.254.68.140:8081/');
}

function getUserPermissions() {
    return axios.get('/user/12345/permissions');
}

export const path = {
    user: {
        registerPost(userPhone, smsCode) {
            return request('client/clientApi/provList', {userPhone, smsCode});
        },
        test2(pageNo, pageSize,state) {
            return request('project/projectApi/listProject', {pageNo, pageSize, state});
        },
    }
}
// 发送 POST 请求
/*axios({
    method: 'post',
    url: 'http://172.253.32.131:9090/client/clientApi/provList',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
}).then((res)=>{
    console.log(res,'故宫')
});*/
function request(url, params) {

    return new Promise((resolve, reject) => {
        console.log(1)
        axios.post(Api + url,querystring.stringify({'params':[params]}) )
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
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

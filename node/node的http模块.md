## node的http模块

1、URL内置模块

   url.parse(url[, flag]): 把一个url地址进行解析，把地址中的每一部分按照对象键值对的方式存储起来
   
```javascript
let url = require('url');

url.parse('http://www.rooklink.cn/main/index.html?form=qq&name=zhangfeng#video', true)
// 加true的话，会把参数解析成为对象的格式

```

2、http
```javascript
let http = require('http');
let server = http.createServer((req, res) => {
        // 当服务创建成功，并且客户端向当前服务器发送请求，才会执行回调函数，并且，发送一次，回调函数被触发执行一次

    // REQ: 请求对象，包含客户端请求的信息
        // req.url  存储的是客户端请求地址，以及问号传参
        // req.method  客户端请求的方式
        // req.headers   客户端的请求头信息，是一个对象， （user-agent是发请求的浏览器地址）
    
    
    // RES: 响应对象，包含了一些属性和方法，可以让服务器端返回给客户端内容
        // res.write  基于这个方法，服务器端可以向客户端返回内容
        // res.writeHead  重写响应头信息
        // res.end(); 结束请求  // 服务器端返回给客户的一般都是string或者buffer格式的数据
        
        res.writeHead(200, {
            'content-type': 'text/plain;charset=utf-8'
        })
    
    let {pathname, query} = url.parse(req.url, true);
});
server.listen(80, () => {
    // 当服务创建成功，并且端口号也已经监听成功，触发的回调函数
    console.log('server is success, listen on ')
});
```
注意： 基于node创建后台程序，我们一般都创建一个server模块， 我们一般都创建server模块，在模块中实现创建web服务，和对于请求的处理
（一般把server服务放到根目录下）

服务器上有一堆项目代码，这堆项目代码中有可能有服务器的程序代码，也有可能有客户端的程序代码，而客户端程序代码我们一般都放到static这个文件夹中

static都是服务器端需要返回给客户端，由客户端进行渲染解析的；
server.js
 都是需要在服务器端基于node执行的（后端项目：一般只有js）

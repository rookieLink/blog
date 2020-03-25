node做后台的优势和特点

- 单线程
- 使用v8引擎，比较快
- 异步非阻塞I/O
- 基于event-driven事件驱动：类似于发布订阅或者回调函数

js运行在客户端浏览器中 =》前端
    
    浏览器给js提供很多全局的属性和方法，例如：window.xxx(setTimeOut\eval\alert\JSON\console...)

js运行在服务器端的node中 =》 后台

    node也给js提供很多内置属性和方法， 例如： http、fs、url、path... 等对象中都提供很多API供js操作

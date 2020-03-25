## fs模块

fs内置模块：实现I/O操作
#### fs.mkdir  / fs.mkdirSync： 

创建文件夹，有Sync的是同步创建，反之没有是异步，想要实现无阻塞I/O操作。我们一般是用异步操作
```javascript
let fs = require('fs');

fs.mkdir('./js', err => {
    if (err) {  // 如果err有值则创建失败，如果err没值，则创建成功
        console.log(err);
        return;
    } 
    console.log('ok');
})
```

#### fs.readdir/ fs.readdirSync
读取文件夹
```javascript
let fs = require('fs');
fs.readdir('./', (err, result) => {
    if (err) {
        console.log(err);
    } 
    console.log(result);
})
```

#### fs.rmdir/ fs.rmdirSync
删除文件夹， 删除文件夹，必须保证文件夹中是空的

#### fs.readFile: 读取文件内容
```javascript
let fs = require('fs');
// 使用utf-8是字符串，不写是流
fs.readFile('./css/1.css', 'utf-8', (err, result) => {
    if (err) {
        console.log(err);
        return;
    } 
    console.log(result);
})
```

#### fs.writeFile: 向文件中写入内容（覆盖写入）
```javascript
let fs = require('fs');
fs.writeFile('./css/q.css', 'body{}', 'utf-8', (err, result) => {
    
});
```
#### fs.appendFile: 追加写入内容

#### fs.copyFile： 拷贝文件到新的位置
```javascript
let fs = require('fs');
fs.copyFile('source.js', 'demination.js', err => {})

```

#### fs.unlink： 删除文件
```javascript
let fs = require('fs');
fs.unlink('./css/1.css', err => {});
```

## fsReadFilePromise

```javascript
let fs = require('fs');
let path = require('path');

let fsReadFilePromise = function(pathName) {
    pathName = path.resolve(path.resolve(), pathName);
  return new Promise((resolve, reject) => {
      fs.readFile(pathName, (err, result) => {
          if (err) {
              reject(err);
              console.log(err);
          } 
          resolve(result);
      })
  })
}
```


# path

```javascript
let path = require('path');

path.resolve()// 返回当前模块的绝对地址

// 两个参数，如果第二个是相对路径，则进行拼接，如果都是绝对路径，以后面那个为准
path.resolve(__dirname, '/js');

// dirname 是当前模块所在的绝对路径，和模块的方法在哪儿执行没有关系
// path.resolve(): 当前模块中方法在那个模块中执行的，那么对应的绝对路径是执行模块的绝对路径
```

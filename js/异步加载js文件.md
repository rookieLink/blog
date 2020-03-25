### 异步加载js文件
html是解析一行执行一行，因为同步加载js文件会阻塞页面解析，所以当引入的代码没有对dom进行操作时，可以进行异步加载js文件

>注: 请尽量不要修改dom结构，这涉及到重绘（repaint）和重流（reflow）的概念

<br/>异步加载js文件的方式

#####（1）defer属性
这种方式只在IE浏览器中可用，会在页面解析完成之后进行无，并且允许\<script>标签中写代码的方式
```html
<script type="text/javascript" src="test.js" defer="defer"></script>

<script type="text/javascript" defer="defer">
    console.log('允许异步加载');
</script>

```
##### （2）async属性
这种方式在IE9以上以及其他浏览器中可用，会在js文件加载完成之后立即执行
```html
<script type="text/javascript" src="test.js" async="async"></script>
```
##### (3) 兼容模式
因为上面两种方式不能同时使用，因为在IE9以上的浏览器，既能识别出来defer， 又能识别async，这样，一段代码会加载两次，并执行两次！

所以我们有以下的方式，通过js代码来加载js文件：
```javascript
function loadJsFile(src, callback) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  if (script.readyState) {
      // 兼容IE浏览器
      script.onreadystatechange = function() {
          // 当js文件加载完成后执行callback函数
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
            callback();
        } 
      }
  } else {
      // 其他浏览器 sarfri chrome firefox opera
      script.onload = function() {
        callback();
      }
  }
  // 我们将这行代码放到最后执行，因为加载是异步的，如果网速过快，当js代码还没有执行到判断状态那里，js文件就已经加载完成的话，会出现回调未执行的情况
  script.src = 'test.js';
  // 将创建好的script标签添加到文档中去
  document.head.appendChild(script);
}
```

### 在所有文档解析完成之后执行代码，使用以以下方式
```javascript
// 需要注意，这里是解析完成，形成domTree， 而不是所有加载完成
document.addEventListner('DomContentLoaded', function() {
    //.....
}, false);
```
当所有文件加载完成并执行过后需要执行代码，用下面这种方式
```javascript
window.onload = function () {
    // .....
}
```

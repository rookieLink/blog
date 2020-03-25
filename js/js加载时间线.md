js加载时间线

1、创建document对象，开始解析web页面，解析html元素和他们的文本内容后添加element对象和text节点到文档中，阶段document.readyState  = 'loading'.

2、遇到link外部css，创建线程加载，并继续解析文档。

3、遇到script外部js，并且没有设置async、defer，浏览器加载，并阻塞，等待js加载完成并执行该脚本，然后继续解析文档。

4、遇到script外部js，并且设置有async、defer，浏览器创建线程加载，并继续解析文档。 对于async属性的脚本，脚本加载完成后立即执行。（异步严禁使用documnet.write（））。

5、遇到img等，先正常解析dom结构，然后浏览器异步加载src，并继续解析文档。

6、当文档解析完成，document.readyState = 'interactive'。

7、文档解析完成后，所有设置有defer的脚本会按照顺序执行。（注意与async的不同，但同样禁止使用document.write()）。

8、document对象触发DOMContentLoaded事件，这也标志着程序执行从同步脚本执行阶段，转化为事件驱动阶段。

9、当所有async的脚本加载完成并执行后，img等加载完成后，documnet.readState = 'complete'， window对象触发load事件。

10、从此，以异步响应方式处理用户输入、网络事件等。

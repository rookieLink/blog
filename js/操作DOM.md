操作dom

查询dom结构

getElementById（主体只能是document，）
getElementsByTagName
getElementsByClassName(IE6-8不支持)
gtetElementsByName（ie6-8只能用来获取表单的name）
querySelectorAll（没有dom映射）


h
client

clienHeight    当前元素可视区域的宽高， （内容的宽高+padding）
clientTop   上部分边框


offset

offsetHeight    client+边框border（内容宽高+padding+border）
offsetTop/Left  获取盒子距离父级参照物的偏移量
                从当前元素的外边框，到父级参照物的内边框
offsetParent    当前盒子的父级参照物
不管父级参照物是谁，都要获取相对于body的偏移量：
```javascript
let offsetBody = function(curElement) {
  // 1.先获取当前元素本身的左便宜和上偏移
  let curLeft = curElement.offsetLeft,
      curTop = curElement.offsetTop;
      p = curElement.offsetParent;
  while(p.tagName !== 'BODY') {
      curLeft += p.clientLeft + p.offsetLeft;
      curTop += p.clientTop + p.offsetTop;
      p = p.offsetParent;
  }
}
```
               
同一个平面中，元素的参照物和结构没有关系，默认他们的父级参照物都是body（当前和平面最外层的盒子），body的参照物是null
                参照物可以改变：构建出不同的平面（使用zIndex，但这个属性只对定位有作用），所以改变元素的定位（position:absolute/relative/fixed）
                可以改变其父级参照物


scroll

scrollHeight    真实内容的宽高（在内容溢出的情况下，算上溢出的部分，内容+上、左padding，没有内容溢出和client一样
                在不同浏览器和是否设置overflow：hidden时，都会对结果产生影响，是一个约等于的值
                
scrollTop/Left  滚动条卷去的高度或者宽度  ，   最小值：0， 最大值： 真实高度-一屏幕的高

13个属性中，只有scrollTop和scrollLeft是可读写的属性，其他的都是只读的

为了兼容浏览器盒子模型属性
```javascript
let winHandle = function(attr) {
    return document.documentElement[attr] || document.body[attr];
}
```
                
                

通过js盒模型获取值的特点
1、获取数字不带单位
2、获取的都是整数，不会出现小数
3、获取的结果都是复合样式值，如果指向获取单一样式值，我们的盒子模型属性操作不了



获取元素具体的某个样式值
1、元素.style.xxxx获取
    =》只能获取所有写在行内样式
2、获取当前元素所有经过浏览器计算的样式
    =》经过计算的样式：只要当前元素可以在页面中呈现，（或者浏览器渲染它了）
    不管样式写在哪，不管是否写了（浏览器会给元素设置一些默认样式）
    
    标准浏览器（IE9+）
    window.getComputedStyle([元素]，[伪类，一般都写null]）
    
    IE6-8
     [元素].currentStyle
```javascript
// 获取当前元素某一个样式属性值
let getCss = function(curElement, attr) {
    if ('getComputedStyle' in window) {
        let val = window.getComputedStyle(curElement, null)[attr];
        // 去单位
        let reg = /^-?\d+(\.\d+)?(px|rem|em|pt)$/i;
        reg.test(val) ? val = parseFloat(val): null;
        return val;
    } 
    // 抛出语法错误，
    throw new SyntaxError('你的浏览器版本过低，请升级到最新版本')
  
}
```           

设置当前元素的样式值
2种方式
1、设置元素的样式类名（样式类及对应的样式都已经处理完成）
2、通过设置行内样式设置  xxx.style.xxx = xxx

```javascript
let setCss = function(curElement, attr, value) {
    /*
    * 细节处理
    * 1、如果需要考虑IE6~8兼容，透明度这个样式在低版本浏览器中不是使用opacity,而是filter（我们两套都要设置）
    * 
    * 2、如果传进来的值没有单位，我们根据情况设置px
    * （某些样式属性才会加单位 width，height，padding，margin， font-size，top，left，bottom，right）
    * 并且用户传递的本身没有单位的
    * */
    if (attr==='opacity') {
        curElement.style.opacity = value;
        curElement.style.filter = `alpha(opacity=${value*100})`;
        return;
    } 
    if (!isNaN(value)) {
        // 说明检测到的结果是false：说明value是纯数字，没单位
        let reg = /^(width|height|fontsize)((padding|margin|)?(top|left|bottom|right)?)&/i;
        reg.test(attr) ? value += px : null;
    } 
    
  curElement['style'][attr] = value;
}
```

批量设置CSS
```javascript
let setGroupCss = function(curElement, options = {}) {
    for (let key in options) {
        if (options.hasOwnProperty(key)) {
            setCss(curElement, key, options[key]);
        } 
    } 
    
}
```

集合get、set、setgroup

```javascript
let css = function(...arg) {
    let len = arg.length;
    if (len >= 3) {
        setCss.apply(null, arg);
        // setCss(...arg);
        return;
    }
    if (len === 2 && typeof agr[1] === 'object' && arg[1] !=null) {
        setGroupCss(...arg);
        return;
    } 
    return getCss(...arg);
}

// 优化
let css = function(...arg) {
    let len = arg.length,
        second = arg[1],
        fn = getCss;
    len >=3 ? fn = setCss : null;
    len===2 && (second instanceof Object) ? fn = setGroupCss: null;
    setGroupCss(...arg);
}
```


























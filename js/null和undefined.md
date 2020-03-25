### null 和 undefined

null和undefined都是代表空/没有的意思， 但是其中还是有一些区别， null代表空值， undefined代表没值

##### null
null往往代表意料之中的没值，通常是由认为赋值，并且会在之后的操作中对其进行赋值（当然，不是一定赋值）;
```javascript
let person = null; // => null
```

##### undefined
undefined 一般代表不是人为的没值，一般由浏览器或者其他环境自动赋值为undefined， 后面可赋值，也可不赋值
```javascript
let person;     // => undefined  这是解析器的默认行为
```

#### 具体体现上的区别：
```javascript
// 转化为数字类型
Number(null); // => 0;
Number(undefined); // NaN

// typeof语法
typeof null; // => Object; 这是一个历史bug， 因为在最开始，null被认为是一个不存在对象的占位符，后来被ECMAScript沿袭下来
typeof undefined; // => undefined

//判断相等
null == undefined; // => true
null === undefined;  //  => false  不严格相等
```

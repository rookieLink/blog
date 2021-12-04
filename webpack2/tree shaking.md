# Tree shaking配置及副作用

tree shaking是基于ESmodule来进行打包的，commonjs不能进行tree shaking，因为ESmodule是静态导入而Commonjs是动态导入，同时如果代码产生了副作用也不能进行tree shaking，如下例子:

```js
// a.js
export const a = ()=>{
    console.log(a)
}
export const b = ()=>{
    a()
}
// b.js
import {a,b} from "a.js"
a()
```

可以看到b.js从a.js中引入了两个方法，但其实只用了一个a,按理说应该要把b方法优化掉，但实际上没有，原因是因为b中调用了a有副作用，因此不能被摇树，在webpack中配置"sideEffect"参数为false则可以忽略副作用进行优化，也可以为该参数准备一个列表，致命要忽略哪些文件的副作用,babel7以前打的包也不能被摇树优化，因为转化为ES5的过程中会产生副作用。
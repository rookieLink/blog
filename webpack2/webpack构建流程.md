#### Webpack 打包工具
1. tree shaking配置，副作用
    ```
    tree shaking是基于ESmodule来进行打包的，commonjs不能进行tree shaking，因为ESmodule是静态导入而Commonjs是动态导入，同时如果代码产生了副作用也不能进行tree shaking，如下例子:
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
    可以看到b.js从a.js中引入了两个方法，但其实只用了一个a,按理说应该要把b方法优化掉，但实际上没有，原因是因为b中调用了a有副作用，因此不能被摇树，在webpack中配置"sideEffect"参数为false则可以忽略副作用进行优化，也可以为该参数准备一个列表，致命要忽略哪些文件的副作用,babel7以前打的包也不能被摇树优化，因为转化为ES5的过程中会产生副作用。
    
    ```
    
2. 相同引入模块合并打包
    ```
    貌似可以使用webpack dll模式进行打包
    ```
    
3. 某个页面单独打包

4. loader和plugin编写
    ```
    loader 实际上是一个函数，入参是source，对source进行修改后进行返回。
    plugin 实际上则是一个对象，它拥有一个apply方法，入参是compile,该参数是webpack打包过程中所用的配置对象。
    ```
    
5. webpack打包流程   
    #### webpack基本概念:
    - **Entry:** 执行构建的入口，可抽象成输入，并且可以拥有多个entry
    - **Module:** 在webpack里一切皆模块，一个模块对应一个文件，webpack从入口文件出发递归找出所有依赖的模块。
    - **Loader:** 模块加载器，用于对模块掉原内容进行加载转换。
    - **Plugin:** 插件，在webpack构建流程中的特定时，广播对应的事件，插件可以监听这些事件，执行对应的事情。
    - **Chunk:** 代码块，一个Chunk由多个模块组合而成，用于代码合并与分割。
    - **Bundle:** 打包后产出一个/多个文件，常见配以[chunk-id]+hash命名。
    #### 构建流程大致分为三个阶段
    - 初始化阶段
    - 编译阶段
    - 输出阶段
    #### 初始化阶段
    ##### 1. 初始化参数
    
    从配置文件和shell语句中读取参数并合并，得出最终配置。
    
    ##### 2. 实例化Compiler
    
    用得到的参数Option初始化Compiler实例，实例中包含了完整的Webpack默认配置，简化代码如下:
    
    ```js
    const webpack = (options, callback) => {
      let compiler
      if (Array.isArray(options)) {
       	// ...
        compiler = createMultiCompiler(options);
      } else {
        compiler = createCompiler(options);
      }
      // ...
      return compiler; 
    }
    
    ```
    
    一般全局只有一个Complier对象，并向外暴露run方法，进行启动编译，Complier是负责管理webpack整个打包流程的“主人公”
    
    Compiler主要负责进行，文件的监听与编译，初始化编译过程中的事件hook
    
    ##### 3. Environment
    
    应用Node的文件系统到Compiler对象，方便后续文件的查找与读取。
    
    ##### 4. 加载插件
    
    依次调用插件的apply方法(默认每个插件的实例都需要提供一个apply)，若为函数则直接调用，将complier作为参数传入，方便插件调用此次构建提供的webpack api并监听后续事件的所有hook。
    
    ```js
    if (Array.isArray(options.plugins)) {
      for (const plugin of options.plugins) {
        if (typeof plugin === "function") {
          plugin.call(compiler, compiler);
        } else {
          plugin.apply(compiler);
        }
      }
    }
    
    ```
    
    ##### 5. 应用默认的webpack配置
    
    ```js
    applyWebpackOptionsDefaults(options);
    // 随即之后，触发一些Hook
    compiler.hooks.environment.call();
    compiler.hooks.afterEnvironment.call();
    new WebpackOptionsApply().process(options, compiler);
    compiler.hooks.initialize.call();
    
    ```
    
    #### 编译阶段
    
    ##### 1. 启动编译
    
    这里有个小逻辑区分是否是watch，如果是非watch，则会正常执行一次compiler.run()。
    
    如果是监听文件(如: --watch)的模式，则会传递监听的watchOptions，生成Watching实例，每次变化都重新出发回调。
    
    ```js
    function watch(watchOptions, handler) {
      if (this.running) {
        return handler(new ConcurrentCompilationError());
      }
    
      this.running = true;
      this.watchMode = true;
      return new Watching(this, watchOptions, handler);
    }
    
    ```
    
    ##### 2. 触发compile事件
    
    该事件是为了告诉插件一次新的编译将要启动，同时会给插件带上compiler对象。
    
    ##### 3. Compilation
    
    这是整个webpack打包构建的关键，每一次的编译(爆款watch检测到文件变化时),compiler都会创建一个Compilation对象，表示当前的模块资源，编译生成资源，变化的文件等，同时也提供很多事件回调给插件进行扩展。

 2、Hooks的规则：（1）所有hooks必须要执行到（不能放在条件判断、循环等中执行）（2）必须按顺序执行

 3、Hooks的两大好处：（1）逻辑复用（最大的好处）（2）关注分离  
 使用hooks的方式：
 ``` javascript

const getSize = () => {
  return window.innerWidth > 1000 ? "large" : "small";
}
const useWindowSize = () => {
  const [size, setSize] = useState(getSize());
  useEffect(() => {
  const handler = () => {
      setSize(getSize())
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
  
  return size;
};


const Demo = () => {
  const size = useWindowSize();
  if (size === "small") return <SmallComponent />;
  else return <LargeComponent />;
};
```

按照以前class的方式来进行，需要先定义一个高阶组件，负责监听窗口大小变化
```javascript

const withWindowSize = Component => {
  // 产生一个高阶组件 WrappedComponent，只包含监听窗口大小的逻辑
  class WrappedComponent extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        size: this.getSize()
      };
    }
    componentDidMount() {
      window.addEventListener("resize", this.handleResize); 
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.handleResize);
    }
    getSize() {
      return window.innerWidth > 1000 ? "large" ："small";
    }
    handleResize = ()=> {
      const currentSize = this.getSize();
      this.setState({
        size: this.getSize()
      });
    }
    render() {
      // 将窗口大小传递给真正的业务逻辑组件
      return <Component size={this.state.size} />;
    }
  }
  return WrappedComponent;
};

class MyComponent extends React.Component{
  render() {
    const { size } = this.props;
    if (size === "small") return <SmallComponent />;
    else return <LargeComponent />;
  }
}
// 使用 withWindowSize 产生高阶组件，用于产生 size 属性传递给真正的业务组件
export default withWindowSize(MyComponent); 
```
虽然也可以实现复用，但代码比较复杂，高阶组件对新手不太友好


## useState:
使用state的原则：
首要原则：state中永远不要保存可以通过计算得到的值，比如：从props传过来的值；cookie、localStorage中读取的值；从URL中读到的值

## useEffect
##### 1、定义依赖项时，需要注意一下三点：
1、依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项其实是没有意义的。  
2、依赖项一般是一个常量数组，而不是一个变量。因为一般在创建callback的时候，你已经很清楚其中要用到哪些依赖项了。  
3、React 会使用浅比较来对比依赖项是否发生了变化，所以要特别注意数组或者对象类型。如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化

##### 1、四种情况下执行useEffect会产生副作用：  
 (1) 每次render后执行： 不提供第二个依赖参数。比如：useEffect(() => {})  
 (2) 仅第一次render后执行，提供一个空数组作为依赖项。比如：useEffect(() => {}, [])  
 (3) 第一次以及依赖项发生变化后执行：提供依赖项数组。比如：useEffect(() => {}, [deps])  
 (4) 组件unmount后执行：返回一个回调函数。比如：useEffect(() => { return () => {} }, [])

Hooks只能在函数的顶级作用域中使用，只能在函数组件或者其他Hooks中使用

## 避免重复定义回调函数

## useCallback：缓存回调函数
函数式组件每一次UI的变化都是通过重新执行整个函数来完成的，注意：每次创建新函数的方式会让接收事件处理函数的组件，需要重新渲染。
```javascript
import React, { useState, useCallback } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  // const handleIncrement = () => setCount(count + 1);  这种每次刷新都会重新生成函数，然后导致button刷新
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count], // 只有当 count 发生变化时，才会重新创建回调函数
  );
  // ...
  return <button onClick={handleIncrement}>+</button>
}

```

## useMemo：缓存计算的结果
如果某个数据是通过其他数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要计算：  
比如我们需要根据筛选条件过滤用户时，希望只有当筛选条件变化时计算一次用户列表，否则不会重复计算
useCallback可以使用useMemo实现：
```javascript
 const myEventHandler = useMemo(() => {
   // 返回一个函数作为缓存结果
   return () => {
     // 在这里进行事件处理
   }
 }, [dep1, dep2]);
```

## useRef：在多次渲染之间共享数据
api: 
```javaScript 
const myRefContainer = useRef(initialValue)
```
可以用来保存某个DOM节点的引用
```javascript

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // current 属性指向了真实的 input 这个 DOM 节点，从而可以调用 focus 方法
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

## useContext: 定义全局状态
api:
```javascript
const value = useContext(MyContext);
```

具体使用场景：
```javascript

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
// 创建一个 Theme 的 Context

const ThemeContext = React.createContext(themes.light);
function App() {
  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // 使用 themes.dark 作为当前 Context 
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{
      background: theme.background,
      color: theme.foreground
    }}>
      I am styled by theme context!
    </button>
  );
}
```

如何动态调整theme呢，可以使用state来保存
```javascript

// ...

function App() {
  // 使用 state 来保存 theme 从而可以动态修改
  const [theme, setTheme] = useState("light");

  // 切换 theme 的回调函数
  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  }, []);

  return (
    // 使用 theme state 作为当前 Context
    <ThemeContext.Provider value={themes[theme]}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```


# 使用Hooks要忘掉组件的生命周期
react的本质：从Model到view的映射；状态变化会导致渲染，引起状态变化的只有两个：  
1、用户操作产生的事件，比如点击了某个按钮。  
2、副作用产生的事件，比如发起有个请求正确返回了。

注： 这两种事件本身并不会导致组件的重新渲染，但我们在这两种事件处理函数中，一定是因为改变了某个状态，这个状态可能是 State 或者 Context，从而导致了 UI 的重新渲染。

对于第一种处理事件和class思维基本一致；对于第二种函数式组件通过useEffect这个Hook更加直观和语义化的方式来进行描述。

在函数组件中思考的方式是：当某个状态变化时，我要做什么，而不是在class组件中的生命周期方法中我要做什么

## class组件和函数式组件的区别
- class具有构造函数，生成一个类实例这样的概念，函数组件只是函数，没有对象、类实例这种概念
- 函数组件基本上没有初始化需要，Hooks会自己负责自己的初始化。构造函数其实是在其他代码执行前的一次性初始化工作，但是函数式组件没有生命周期机制，也没有构造函数，怎么实现一次性代码的执行呢？
  
  可以使用useRef这个Hook，实现一个一次性执行某段代码的自定义Hook，如下：
  ```javascript
    import { useRef } from 'react';

    // 创建一个自定义 Hook 用于执行一次性代码
    function useSingleton(callback) {
      // 用一个 called ref 标记 callback 是否执行过
      const called = useRef(false);
      // 如果已经执行过，则直接返回
      if (called.current) return;
      // 第一次调用时直接执行
      callBack();
      // 设置标记为已执行过
      called.current = true;
    }

    const MyComp = () => {
      // 使用自定义 Hook
      useSingleton(() => {
        console.log('这段代码只执行一次');
      });

      return (
        <div>My Component</div>
      );
    };
  ```
  备注：关于这里思考一下，为什么不适用useEffect一次性执行代码呢？  
  因为useEffect是在render完成之后执行，需要在函数体执行之前执行的话，这种方式就行不通了，需要采取上面的这种方式

-  可以通过useEffect做到基本上和componentDidMount，componentWillUnmount 和 componentDidUpdate生命周期等价的
  ```javascript
    useEffect(() => {
      // componentDidMount + componentDidUpdate
      console.log('这里基本等价于 componentDidMount + componentDidUpdate');
      return () => {
        // componentWillUnmount
        console.log('这里基本等价于 componentWillUnmount');
      }
    }, [deps])
  ```
  之所以说是基本等价于，是因为：

  1、useEffect这个Hook接受的callback只有在依赖项变化的时候才会执行，而传统的componentDidUpdate一定会执行，我们需要手动判断状态变化，再执行逻辑

  2、callback 返回的函数（一般用于清理工作）在下一次依赖项发生变化以及组件销毁之前执行，而传统的 componentWillUnmount 只在组件销毁时才会执行。

  ```javascript
  import React, { useEffect } from 'react';
  import comments from './comments';

  function BlogView({ id }) {
    const handleCommentsChange = useCallback(() => {
      // 处理评论变化的通知
    }, []);
    useEffect(() => {
      // 获取博客内容
      fetchBlog(id);
      // 监听指定 id 的博客文章的评论变化通知
      const listener = comments.addListener(id, handleCommentsChange);
      
      return () => {
        // 当 id 发生变化时，移除之前的监听
        comments.removeListener(listener);
      };
    }, [id, handleCommentsChange])
  }
  ```

  ## 其他生命周期
  但是 Class 组件中还有其它一些比较少用的方法，比如 getSnapshotBeforeUpdate, componentDidCatch, getDerivedStateFromError。比较遗憾的是目前 Hooks 还没法实现这些功能。因此如果必须用到，你的组件仍然需要用类组件去实现。


  # Hooks典型的使用场景
  ## 如何创建自定义Hooks？
  
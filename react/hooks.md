
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
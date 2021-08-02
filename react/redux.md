## Redux
思考：Redux是要解决什么问题，引入了什么样的新概念

因为有些业务场景，组件级别的state和从上而下传递的props这两个状态机制，无法满足复杂功能的需要。  
### Redux store
两大特点：  
- Redux Store 是全局唯一的。即整个应用程序一般只有一个 Store
- Redux Store 是树状结构，可以更天然地映射到组件树的结构，虽然不是必须的

所以我们可以将状态放在组件之外，让React成为更加纯粹的表现层：  
- 跨组件的状态共享：当某个组件发起一个请求时，将某个 Loading 的数据状态设为 True，另一个全局状态组件则显示 Loading 的状态。
- 同组件多个实例的状态共享：某个页面组件初次加载时，会发送请求拿回了一个数据，切换到另外一个页面后又返回。这时数据已经存在，无需重新加载。设想如果是本地的组件 state，那么组件销毁后重新创建，state 也会被重置，就还需要重新获取数据。

### Redux的三个基本概念
State、Action、Reducer
- 其中 State 即 Store，一般就是一个纯 JavaScript Object。
- Action 也是一个 Object，用于描述发生的动作。
- 而 Reducer 则是一个函数，接收 Action 和 State 并作为参数，通过计算得到新的 Store。

redux要保持数据的不可变性（Immutable），即所有对于Store的修改都必须通过一个公式去完成，也就是Reducer而不是直接修改Store，这样会带来两大好处：
- 可预测性（Predictable）：即给定一个初始状态和一系列的 Action，一定能得到一致的结果，同时这也让代码更容易测试。
- 易于调试：可以跟踪 Store 中数据的变化，甚至暂停和回放。因为每次 Action 产生的变化都会产生新的对象，而我们可以缓存这些对象用于调试。Redux 的基于浏览器插件的开发工具就是基于这个机制，非常有利于调试。

### 创建一个Redux的逻辑：
1、创建Store  ->  2、利用Action和Reducer修改Store  ->  3、利用subscribe监听Store变化  
#### 示例：
```javascript
  import { createStore } from 'redux'

  // 定义 Store 的初始值
  const initialState = { value: 0 }

  // Reducer，处理 Action 返回新的 State
  function counterReducer(state = initialState, action) {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 }
      case 'counter/decremented':
        return { value: state.value - 1 }
      default:
        return state
    }
  }

  // 利用 Redux API 创建一个 Store，参数就是 Reducer
  const store = createStore(counterReducer)

  // Store 提供了 subscribe 用于监听数据变化
  store.subscribe(() => console.log(store.getState()))

  // 计数器加 1，用 Store 的 dispatch 方法分发一个 Action，由 Reducer 处理
  const incrementAction = { type: 'counter/incremented' };
  store.dispatch(incrementAction);
  // 监听函数输出：{value: 1}

  // 计数器减 1
  const decrementAction = { type: 'counter/decremented' };
  store.dispatch(decrementAction)
  // 监听函数输出：{value: 0}
```

注意：在Reducer中每次都必须返回一个新对象，保证数据不可变的原则

### 如何在React中使用Redux

如何建立React和Redux的联系呢？  

主要是两点：  
1、React组件都够依赖的Store的数据发生变化时，重新Render；  
2、在React组件中，能够在某些时机去Dispatch一个action，以触发Store的更新

使用react-redux工具库，这要是Facebook提供的，建立起React和Redux之间的桥梁，实现互通；为了确保需要绑定的组件能够访问到全局唯一的 Redux Store，利用了 React 的 Conext 机制去存放 Store 的信息。所以通常像下面这种方式：
```javascript
  import React from 'react'
  import ReactDOM from 'react-dom'

  import { Provider } from 'react-redux'
  import store from './store'

  import App from './App'

  const rootElement = document.getElementById('root')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
```

在函数式组件中使用Redux，利用react-redux提供的useSelector和useDispatch这两个Hooks（注意：这两个钩子不是react提供的，是react-redux提供的）：  

```javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export function Counter() {
  // 从 state 中获取当前的计数值
  const count = useSelector(state => state.value)

  // 获得当前 store 的 dispatch 方法
  const dispatch = useDispatch()

  // 在按钮的 click 时间中去分发 action 来修改 store
  return (
    <div>
      <button
        onClick={() => dispatch({ type: 'counter/incremented' })}
      >+</button>
      <span>{count}</span>
      <button
        onClick={() => dispatch({ type: 'counter/decremented' })}
      >-</button>
    </div>
  )
}

```
useSelector的作用就是为了能够在Store的某些数据发生变化时重新render。

其实整个流程就相当于视图订阅Store的变化，通过dispatch触发action，执行reducer，然后更新Store；这样就形成了一个状态流转的闭环

### Redux处理异步逻辑
按照常规的网络请求会出现逻辑无法复用的情况，所以Redux中提供了middleware这样一个机制，协助我们实现异步Action的概念：

##### middleware：middleware 可以让你提供一个拦截器在 reducer 处理 action 之前被调用。在这个拦截器中，你可以自由处理获得的 action。无论是把这个 action 直接传递到 reducer，或者构建新的 action 发送到 reducer，都是可以的。

redux的action不仅仅可以是一个Object，也可以是其他任何东西，也可以是一个函数。利用这个机制Redux提供了redux-thunk中间件。它如果发现接受到的 action 是一个函数，那么就不会传递给 Reducer，而是执行这个函数，并把 dispatch 作为参数传给这个函数，从而在这个函数中你可以自由决定何时，如何发送 Action。

示例：
```javascript
  import { createStore, applyMiddleware } from 'redux'
  import thunkMiddleware from 'redux-thunk'
  import rootReducer from './reducer'

  const composedEnhancer = applyMiddleware(thunkMiddleware)
  const store = createStore(rootReducer, composedEnhancer)


  function fetchData() {
    return dispatch => {
      dispatch({ type: 'FETCH_DATA_BEGIN' });
      fetch('/some-url').then(res => {
        dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
      }).catch(err => {
        dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
      })
    }
  }

  // 具体使用场景
  import fetchData from './fetchData';

  function DataList() {
    const dispatch = useDispatch();
    // dispatch 了一个函数由 redux-thunk 中间件去执行
    dispatch(fetchData());
  }
```

异步Action不是一个具体的概念，而是Redux的一种使用模式，并没有引入新概念
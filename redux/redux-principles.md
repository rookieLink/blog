# redux基本概念
## 三条基本原则
#### 1、single source of truth
应用的全局状态存储在一个包含在single store 的对象树中

#### 2、state is read-only
改变 state的唯一方式是 emit an action，一个描述发生了什么的对象

#### 3、changes are made with pure functions
reducers是纯函数，接收先前的state和action作为参数，而返回一个新的state对象作为下一状态，而不是改变先前的state
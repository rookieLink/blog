#### 手写实现系列

- Promise

  ```js
  const PENDING = 'pending';
      const FULFILLED = 'fulfilled';
      const REJECTED = 'rejected';
       class myPromise {
              constructor(executor) {
                  let self = this;
                  self.status = PENDING;
                  self.value = undefined;
                  self.reason = undefined;
                  self.onResolvedCallbacks = [];
                  self.onRejectedCallbacks = [];
  
                  let resolve = (value) => {
                      if (self.status === PENDING) {
                          self.status = FULFILLED;
                          self.value = value;
                          self.onResolvedCallbacks.forEach((fn) => fn());
                      }
                  };
  
                  let reject = (reason) => {
                      if (self.status === PENDING) {
                          self.status = REJECTED;
                          self.reason = reason;
                          self.onRejectedCallbacks.forEach((fn) => fn());
                      }
                  };
                  try {
                      executor(resolve, reject);
                  } catch {
                      reject(err);
                  }
              }
  
              then(onFulfilled, onRejected) {
                  //处理then里面不是回调函数情况
                  //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
                  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
                  onRejected =
                      typeof onRejected === 'function'
                          ? onRejected
                          : (err) => {
                                throw err;
                            };
                  let self = this;
                  return new myPromise((resolve, reject) => {
                      if (self.status === 'fulfilled') {
                          setTimeout(() => {
                              try {
                                  let x = onFulfilled(self.value);
                                  x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
                              } catch (err) {
                                  reject(err);
                              }
                          }, 0);
                      }
                      if (self.status === 'rejected') {
                          setTimeout(() => {
                              try {
                                  let x = onRejected(self.reason);
                                  x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
                              } catch (err) {
                                  reject(err);
                              }
                          }, 0);
                      }
                      if (self.status === 'pending') {
                          self.onResolvedCallbacks.push(() => {
                              setTimeout(() => {
                                  let x = onFulfilled(self.value);
                                  x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
                              }, 0);
                          });
                          self.onRejectedCallbacks.push(() => {
                              setTimeout(() => {
                                  let x = onRejected(self.reason);
                                  x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
                              }, 0);
                          });
                      }
                  });
              }
          }
  
  
  ```

  ```js
  // 自己写的
  class Promise {
    constructor(exector){
      this.state = "pending"
      this.reason = undefined
      this.value = undefined
      this.successCallBack = []
      this.failedCallBack = []
      const reject = (v)=>{
        setTimeout(()=>{
          if(this.state==="pending"){
            this.state = "reject"
            this.reason = v
            this.failedCallBack.forEach(fn=>fn())
          }
        },0)
      }
      const reslove = (v)=>{
        setTimeout(()=>{
          if(this.state==="pending"){
            this.state="success"
            this.value = v
            this.successCallBack.forEach(fn=>fn())
          }
        },0)
      }
      try{
        exector(reslove,reject)
      }catch(e){
        reject(e)
      }
    }
    then(suCallBack,faCallBack){
      // 此处可以判断下这两个参数到底是不是函数，如果不是需要包装成函数
      return new Promise((reslove,reject)=>{
        if(this.state==="success"){
          try{
            const x = suCallBack(this.value)
            x instanceof Promise?x.then(reslove,reject):reslove(x)
          }catch(e){
            
          }
        }
        if(this.state==="reject"){
          try{
            const x = faCallBack(this.reason)
            return 
          }catch(e){
            
          }
        }
      })
      
    }
  }
  ```

- Promise.all

  ```
  
  ```

- Promise.race

  ```
  
  ```

- Promise.retry

  ```
  
  ```

  
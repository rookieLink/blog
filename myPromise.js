class MyPromise {
    constructor(excutorCallBack) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];
        let resolveFn = result => {
            if (this.status !== 'pending') return;
            let timer = setTimeout(() => {
                clearTimeout(timer);
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => {
                    item(this.value);
                })
            }, 0);
        };
        let rejectFn = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => {
                    item(this.value);
                })
            });
        };
        try {
            excutorCallBack(resolveFn, rejectFn);

        } catch (e) {
            // => 有异常信息，按照rejected状态处理
            rejectFn(e);
        }
    }

    then(fulfilledCallBack, rejectedCallBack) {
        // this.fulfilledAry.push(fulfilledCallBack);
        // this.rejectedAry.push(rejectedCallBack);
        if (typeof fulfilledCallBack !== 'function') {
            fulfilledCallBack = result => {return result};
        }
        if (typeof rejectedCallBack !== 'function') {
            rejectedCallBack = result => {throw new Error(result instanceof Error ? result.message: result)};
        }
        return new MyPromise((resolve, reject) => {
            this.fulfilledAry.push(() => {
                console.log(this.value);
                try {
                    let x = fulfilledCallBack(this.value);
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject);
                        return;
                    }
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            });
            this.rejectedAry.push(() => {
                try {
                    let x = rejectedCallBack(this.value);
                    if (x instanceof MyPromise) {
                        x.then(resolve, reject);
                        return;
                    }
                    resolve(x);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }

    catch(rejectedCallback) {
        return this.then(null, rejectedCallback);
    }

    static all(promiseAry = []) {  // => MyPromise.all
        return new MyPromise((resolve, reject) => {
            // index记录成功的数量；
            let index = 0,
                result = [];
            for (let i = 0; i< promiseAry.length; i++) {
                promiseAry[i].then(value => {
                    index++;
                    result[i] = value;
                    if (index === promiseAry.length) {
                        resolve(result);
                    }
                }, reject);
            }
        })
    }
}

new MyPromise((resolve, reject) => {
    console.log('1111');
    resolve(100);
}).then(resolve => {
    return 200;
}).then(result => {
    return 400;
}).then(result => {
    console.log(result);
}).catch(e => {});

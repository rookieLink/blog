/**硬币求解问题
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
//  动态规划
var coinChange = function(coins, amount) {
  let amounts = []
  amounts[0] = 0;
  for(let i = 1; i <= amount; i++) {
      let min = Infinity;
      for(let j = 0; j < coins.length; j++) {
          if(i-coins[j] >= 0) {
              if (min > amounts[i-coins[j]]) {
                  min = amounts[i-coins[j]] + 1
              }
          }
      }
      amounts[i] = min;
  }
  return amounts[amount] === Infinity ? -1 : amounts[amount]
};

// 记忆搜索
var coinChange = function coinChange(coins, amount) {
  if (amount < 0) return -1;
  if (amount === 0) return 0;

  let min = Infinity;
  for (let i = 0; i < coins.length; i++) {
    let res = coinChange(coins, amount-coins[i])
    if (res >= 0 && res < min) {
      min = res
    }
  }
  return min === Infinity ? -1 : min
}





function throttle (callback, time) {
  let flag = true;

  return function() {
    let context = this, args = arguments;
    if (flag) {
      callback.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, time)
    }
  }
}

function a(n) {
  console.log(n);
}

const getFun = throttle(a, 1000);


function debounce(callback, time) {
  let timer = null;

  return function() {
    let context = this, args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.call(context, ...args);
      clearTimeout(timer);
      timer = null
    }, time)
  }
}


function b() {
  console.log('b')
}
function c() {
  console.log('c')
}

let b1 = debounce(b)
let c1 = debounce(c)

// 函数本身 + debounce执行期上下文


console.log(1);
new Promise((resolve) => {
  resolve(2)
}).then(res => {
  console.log(res)
}).then(res => {
  console.log('ec', res)
  console.log('3')
})

new Promise(resolve => {
  resolve(4)
}).then(res => console.log(res))

console.log(6)

const createPromise = (id) => 
	new Promise(resolve=>
		setTimeout(()=>{
			console.log("promise->"+id+":"+new Date());
			resolve(id);
		},1000))
var tasks = [createPromise(1),createPromise(2),createPromise(3)];
console.log(tasks);
var doTask = tasks.reduce((prev,next)=>prev.then((res) => next()),Promise.resolve());
doTask.then(()=>console.log("all done."));
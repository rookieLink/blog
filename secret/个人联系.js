function popSort(nums) {
  if (!Array.isArray(nums)) return;
  const len = nums.length;
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < len - i - 1; j++) {
      if(nums[j] > nums[j+1]) {
        let cur = nums[j+1];
        nums[j+1] = nums[j];
        nums[j] = cur
      }
    }
  }
  return nums
}

function insertSort(nums) {
  if (!Array.isArray(nums)) return;
  const len = nums.length;
  for(let i = 1; i < len; i++) {
    let cur = nums[i]
    let j = i;
    for(; j > 0 && cur < nums[j-1]; j--) {
      nums[j] = nums[j-1]
    }
    nums[j] = cur
  }
  return nums
}

function quickSort(nums) {
  sort(nums, 0, nums.length - 1)
}

function sort(arr, lef, right) {
  if(lef < right) {
    let p = getPart(arr, lef, right);
    sort(arr, lef, p);
    sort(arr, p + 1, right)
  }
}

function getPart(arr, lef, right) {
  let val = arr[lef];
  let i = right;
  for(let j = lef; j < i;  ) {
    if (val < arr[j]) {
      let cur = arr[j];
      arr[j] > arr[i];
      arr[i] = arr[cur];
      i--;
    } else {
      j++;
    }
  }
  return i
}


function swap(A, i, j) {
  const t = A[i];
  A[i] = A[j];
  A[j] = t;
}


/**
 *
 * @param {*} A  数组
 * @param {*} p  起始下标
 * @param {*} r  结束下标 + 1
 */
function divide(A, p, r) {
  const x = A[r - 1];
  let i = p - 1;

  for (let j = p; j < r - 1; j++) {
    if (A[j] < x) {
      i++;
      swap(A, i, j);
    }
  }

  swap(A, i + 1, r - 1);

  return i + 1;
}

function qsort(A, p = 0, r) {
  r = r || A.length;

  if (p < r - 1) {
    const q = divide(A, p, r);
    qsort(A, p, q);
    qsort(A, q + 1, r);
  }

  return A;
}

function sort1(nums, p, r) {
  if (p < r - 1) {
    const d = divide(nums, p, r)
    sort1(nums, p,  d);
    sort1(nums, d, r);
  }
}
function divide1(nums, p, r) {

}


// 防抖
function debounce(callback, time) {
  let timer;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    let ctx = this;
    let args = arguments;
    timer = setTimeout(() => {
      callback.apply(ctx, args)
      clearTimeout(timer);
      timer = null
    }, time)
  }
}

// 节流
function throttle(callback, delay) {
  const call = false;
  return function() {
    if(!call) {
      callback.call(this, arguments);
      call = true;
      setTimeout(() => {
        call = false
      }, delay )
    }

  }
}
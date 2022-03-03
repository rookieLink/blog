/**
 * 归并排序
 * @param {number[]} nums
 * @return {number[]}
 */
 var sortArray = function(nums) {
  merge_sort(nums, 0, nums.length)
  return nums
}

function devide(l, r) {
  return Math.floor((l + r)/2)
}

function merge_sort(arr, l, r) {
  if ( l >= r - 1) {
      return
  };
  let d = devide(l, r);
  merge_sort(arr, l, d);
  merge_sort(arr, d, r);
  merge(arr, l, r, d);
}

function merge(arr, l, r, d) {
  let a = arr.slice(l, d);
  let b = arr.slice(d, r);
  a.push(Infinity);
  b.push(Infinity);
  for(let i = 0, j = 0, k = l; k < r; k++ ) {
      if (a[i] < b[j]) {
          arr[k] = a[i];
          i++
      } else {
          arr[k] = b[j];
          j++
      }
  }
}
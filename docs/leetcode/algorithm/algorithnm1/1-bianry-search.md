# bianry search

## 704. 二分查找

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

```js
var search = function (nums, target) {
  let start = 0
  let end = nums.length - 1
  while (start <= end) {
    let mid = Math.floor((end - start) / 2) + start
    if (nums[mid] === target) return mid
    if (nums[mid] > target) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return -1
}
```

## 278. 第一个错误的版本

```js
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let start = 1
    let end = n
    let result
    while (start <= end) {
      let mid = Math.floor((end - start) / 2) + start
      if (isBadVersion(mid)) {
        result = mid
        end = mid - 1
      } else {
        start = mid + 1
      }
    }
    return result
  }
}
```

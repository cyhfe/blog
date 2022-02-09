---
sidebar_position: 2
---

# two pointers

## 977. 有序数组的平方

```js
var sortedSquares = function (nums) {
  let output = new Array(nums.length).fill(0)

  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const leftValue = Math.pow(nums[left], 2)
    const rightValue = Math.pow(nums[right], 2)

    if (leftValue > rightValue) {
      output[right] = leftValue
      right--
    } else {
      output[right] = leftValue
      left++
    }
  }
  return output
}
```

## 189. 轮转数组

```js
var rotate = function (nums, k) {
  function reverse(left, right) {
    while (left < right) {
      ;[nums[left], nums[right]] = [nums[right], nums[left]]
      left++
      right--
    }
  }
  k = k % nums.length

  let left = 0
  let right = nums.length - 1

  reverse(left, right)
  reverse(0, k - 1)
  reverse(k, nums.length - 1)
}
```

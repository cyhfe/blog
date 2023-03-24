---
sidebar_position: 17
tags:
  - 算法
---

# missing-number

[missing-number](https://leetcode.com/problems/missing-number/)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */

// 1
var missingNumber = function (nums) {
  for (let i = 0; i <= nums.length; i++) {
    let index = nums.indexOf(i)
    if (index === -1) return i
  }
}

// 2
var missingNumber = function (nums) {
  let array = new Array(nums.length + 1).fill(-1)
  for (const num of nums) {
    array[num] = num
  }
  return array.indexOf(-1)
}
```

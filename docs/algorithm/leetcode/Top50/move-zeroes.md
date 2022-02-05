---
sidebar_position: 6
tags:
  - 算法
---

[move-zeroes](https://leetcode.com/problems/move-zeroes/)

```js
var moveZeroes = function (nums) {
  let i = 0
  let j = nums.length - 1
  while (i < j) {
    if (nums[i] === 0) {
      nums.splice(i, 1)
      nums.push(0)
      j--
    } else {
      i++
    }
  }
}
```

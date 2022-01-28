---
sidebar_position: 14
tags:
  - 算法
---

# contains-duplicate

[contains-duplicate](https://leetcode.com/problems/contains-duplicate/)

```js
// 1
var containsDuplicate = function (nums) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) return true
    map[nums[i]] = true
  }
  return false
}

// 2
var containsDuplicate = function (nums) {
  const len = nums.length
  const set = new Set([...nums])
  if (len !== set.size()) return true
  return false
}
```

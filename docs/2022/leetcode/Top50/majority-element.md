---
sidebar_position: 9
tags:
  - 算法
---

[majority-element](https://leetcode.com/problems/majority-element/)

```js
var majorityElement = function (nums) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    if (!map[nums[i]]) {
      map[nums[i]] = 1
    } else {
      map[nums[i]] += 1
    }
  }

  let maxValue
  let maxKey
  for (let key in map) {
    if (!maxValue) {
      maxValue = map[key]
      maxKey = key
      continue
    }
    if (map[key] > maxValue) {
      maxValue = map[key]
      maxKey = key
    }
  }
  return maxKey
}
```

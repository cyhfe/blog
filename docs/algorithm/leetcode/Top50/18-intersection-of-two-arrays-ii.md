---
sidebar_position: 18
tags:
  - 算法
---

# intersection-of-two-arrays-ii

[intersection-of-two-arrays-ii](https://leetcode.com/problems/intersection-of-two-arrays-ii/)

```js
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const result = []
  const map = {}

  for (let v1 of nums1) {
    map[v1] = map[v1] ? map[v1] + 1 : 1
  }

  for (let v2 of nums2) {
    if (map[v2]) {
      map[v2] = map[v2] - 1
      result.push(v2)
    }
  }
  return result
}
```

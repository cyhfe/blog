---
sidebar_position: 15
tags:
  - 算法
---

# first-unique-character-in-a-string

[first-unique-character-in-a-string](https://leetcode.com/problems/first-unique-character-in-a-string/)

```js
/**
 * @param {string} s
 * @return {number}
 */

// 1
var firstUniqChar = function (s) {
  for (let i = 0; i < s.length; i++) {
    let unique = true
    for (let j = 0; j < s.length; j++) {
      if (i === j) continue
      if (s[i] === s[j]) {
        unique = false
        break
      }
    }
    if (unique) {
      return i
    }
  }
  return -1
}

// 2
var firstUniqChar = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) return i
  }
  return -1
}
```

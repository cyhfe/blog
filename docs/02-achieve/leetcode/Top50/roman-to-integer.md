---
sidebar_position: 10
tags:
  - 算法
---

[roman-to-integer](https://leetcode.com/problems/roman-to-integer/)

```js
var romanToInt = function (s) {
  const symbols = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  }
  let sum = 0
  for (let i = 0; i < s.length; i++) {
    if (!s[i + 1]) {
      sum += symbols[s[i]]
    } else {
      sum += symbols[s[i]] > symbols[s[i + 1]] ? symbols[s[i]] : -symbols[s[i]]
    }
  }
  return sum
}
```

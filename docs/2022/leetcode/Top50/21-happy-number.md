---
sidebar_position: 21
tags:
  - 算法
---

# happy-number

[happy-number](https://leetcode.com/problems/happy-number/)

```js
function isHappy(n) {
  let target = String(n)
  let result = 0
  let length = target.length

  const map = {}

  while (true) {
    for (let i = 0; i < length; i++) {
      result += Math.pow(target[i], 2)
    }
    if (result === 1) return true
    if (!map[result]) {
      map[result] = true
    } else {
      return false
    }

    target = String(result)
    length = target.length
    result = 0
  }
}

console.log(isHappy(2))
```

---
sidebar_position: 3
tags:
  - 算法
---

[fizz-buzz](https://leetcode.com/problems/fizz-buzz/)

```js
function fizzBuzz(n) {
  const output = []
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) {
      output.push("FizzBuzz")
    } else if (i % 3 === 0) {
      output.push("Fizz")
    } else if (i % 5 === 0) {
      output.push("Buzz")
    } else {
      output.push(String(i))
    }
  }
  return output
}
```

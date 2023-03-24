---
sidebar_position: 22
tags:
  - 算法
---

# pascals-triangle

[pascals-triangle](https://leetcode.com/problems/pascals-triangle/)

```js
var generate = function (numRows) {
  const output = []
  for (let i = 0; i < numRows; i++) {
    output[i] = []
    output[i][0] = 1
    for (let j = 1; j < i; j++) {
      output[i][j] = output[i - 1][j - 1] + output[i - 1][j]
    }
    output[i][i] = 1
  }
  return output
}
```

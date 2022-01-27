---
sidebar_position: 12
tags:
  - 算法
---

# best-time-to-buy-and-sell-stock-ii

[best-time-to-buy-and-sell-stock-ii](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

```js
var maxProfit = function (prices) {
  let profit = 0
  for (let i = 1; i < prices.length; i++) {
    const [prev, curr] = [prices[i - 1], prices[i]]
    if (prev < curr) {
      profit += curr - prev
    }
  }
  return profit
}
```

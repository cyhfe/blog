---
sidebar_position: 19
tags:
  - 算法
---

# best-time-to-buy-and-sell-stock

[best-time-to-buy-and-sell-stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

```js
/**
 * @param {number[]} prices
 * @return {number}
 */

// O(n^2)
var maxProfit = function (prices) {
  let profit = 0
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      profit = Math.max(profit, prices[j] - prices[i])
    }
  }
  return profit
}

// O(n)
var maxProfit = function (prices) {
  let profit = 0
  let min = prices[0]
  for (let i = 1; i < prices.length; i++) {
    if (min > prices[i]) {
      min = prices[i]
    } else {
      profit = Math.max(profit, prices[i] - min)
    }
  }
  return profit
}
```

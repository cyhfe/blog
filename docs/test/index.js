/**
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function (prices) {
  let profit = 0
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      profit = Math.max(profit, prices[j] - prices[i])
    }
  }
  return profit
}

var maxProfit = function (prices) {
  let profit = 0
  let min = prices[0]

  for (let i = 1; i < prices.length; ++i) {
    if (min > prices[i]) {
      min = prices[i]
    } else if (prices[i] - min > profit) {
      profit = prices[i] - min
    }
  }

  return profit
}

const prices = [7, 6, 4, 3, 1]
console.log(maxProfit(prices))

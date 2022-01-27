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

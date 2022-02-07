function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  let pre = 0
  let cur = 1
  while (n > 1) {
    let next = pre + cur
    pre = cur
    cur = next
    n--
  }
  return cur
}

function fibonacciR(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  return fibonacciR(n - 1) + fibonacciR(n - 2)
}

console.log(fibonacci(10))

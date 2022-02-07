# 递归

## 循环与递归

### Iteration vs. Recursion

```js
function sum(nums) {
  let output = 0
  for (let i = 0; i < nums.length; i++) {
    output += nums[i]
  }
  return sum
}
```

```js
function sumR(nums) {
  if (nums.length === 1) {
    // base case
    return nums[0]
  } else {
    // recursive case
    return nums[0] + sum(nums.splice(1))
  }
}
```

### 阶乘

```js
function factorial(n) {
  let output = 1
  while (n > 1) {
    output = output * n
    n--
  }
  return output
}

function factorialR(n) {
  if (n === 1) {
    return 1
  }
  return n * factorialR(n - 1)
}
```

### Fibonacci

```js
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
```

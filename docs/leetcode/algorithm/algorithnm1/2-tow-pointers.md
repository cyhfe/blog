# two pointers

## 977. 有序数组的平方

```js
var sortedSquares = function (nums) {
  let output = new Array(nums.length).fill(0)

  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const leftValue = Math.pow(nums[left], 2)
    const rightValue = Math.pow(nums[right], 2)

    if (leftValue > rightValue) {
      output[right] = leftValue
      right--
    } else {
      output[right] = leftValue
      left++
    }
  }
  return output
}
```

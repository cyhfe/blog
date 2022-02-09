# two pointers

## 282 移动零

```js
var moveZeroes = function (nums) {
  let head = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      ;[nums[head], nums[i]] = [nums[i], nums[head]]
      head++
    }
  }
}
```

## 167 两数之和

```js
var twoSum = function (numbers, target) {
  const map = new Map()
  for (let i = 0; i < numbers.length; i++) {
    if (!map.has(numbers[i])) {
      map.set(target - numbers[i], i)
    } else {
      return [map.get(numbers[i]) + 1, i + 1]
    }
  }
}
```

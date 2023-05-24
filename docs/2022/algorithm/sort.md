# 排序

## 冒泡排序

```js
function bubbleSort(nums) {
  // 每次循环将最大值放右边
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      if (nums[j] > nums[j + 1]) {
        ;[nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}
```

## 选择排序

```js
function selectionSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j
      }
    }
    ;[nums[i], nums[minIndex]] = [nums[minIndex], nums[i]]
  }
  return nums
}
```

## 插入排序

```js
function insertSort(nums) {
  for (let i = 1; i < nums.length; i++) {
    let j = i
    let temp = nums[i]
    while (j > 0 && nums[j - 1] > temp) {
      nums[j] = nums[j - 1]
      j--
    }
    nums[j] = temp
  }
  return nums
}
```

## 归并

```js
function mergeSort(nums) {
  if (nums.length > 1) {
    const mid = Math.floor(nums.length / 2)
    const left = mergeSort(nums.slice(0, mid))
    const right = mergeSort(nums.slice(mid))
    return merge(left, right)
  }
  return nums
}

function merge(left, right) {
  let i = 0
  let j = 0
  let output = []
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      output.push(left[i])
      i++
    } else {
      output.push(right[j])
      j++
    }
  }
  if (i < left.length) {
    return output.concat(left.slice(i))
  }
  if (j < right.length) {
    return output.concat(right.slice(j))
  }
  return output
}
```

## 快排

```js
function quickSort(nums) {
  quick(nums, 0, nums.length - 1)
  return nums
}

function quick(nums, start, end) {
  if (end <= start) return
  const pivot = partition(nums, start, end)
  quick(nums, start, pivot - 1)
  quick(nums, pivot + 1, end)
}

function partition(nums, start, end) {
  let counter = start
  let pivot = end
  for (let i = start; i < end; i++) {
    if (nums[i] < nums[pivot]) {
      ;[nums[counter], nums[i]] = [nums[i], nums[counter]]
      counter++
    }
  }
  ;[nums[counter], nums[pivot]] = [nums[pivot], nums[counter]]
  return counter
}
```

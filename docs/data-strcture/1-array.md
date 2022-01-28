---
sidebar_position: 1
---

# Array

Array 通过 index 存储数据.对数组进行操作需要更改对应的 index 和 length

## 用对象模拟 Array

```js
class MyArray {
  constructor() {
    this.length = 0
    this.data = {}
  }

  get(index) {
    return this.data[index]
  }

  push(item) {
    this.data[this.length] = item
    this.length++
    return this.length
  }

  pop() {
    const lastItem = this.data[this.length - 1]
    delete this.data[this.length - 1]
    this.length--
    return lastItem
  }

  remove(index) {
    const removedItem = this.data[index]
    // index后面的都要往前挪一位
    this.shiftItems(index)
    return removedItem
  }

  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1]
    }
    delete this.data[this.length - 1]
    this.length--
  }
}
```

## 练习

### 翻转字符串

```js
// loop
function reverse(string) {
  const output = []
  let i = string.length - 1
  while (i >= 0) {
    output.push(string[i])
    i--
  }
  return output.join("")
}
```

```js
// 语义化
function reverse(string) {
  return string.split("").reverse().join("")
}
```

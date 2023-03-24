---
sidebar_position: 2
---

# hash-table

通过 hash 函数生成地址，存储键值对

## hash-table 实现

```js
//[[key, value], [key,value]], [[key, value]]
//          address 1             address2
class HashTable {
  constructor(size) {
    this.data = new Array(size)
  }

  _hash(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length
    }
    return hash
  }

  set(key, value) {
    let address = this._hash(key)
    if (!this.data[address]) {
      this.data[address] = []
    }
    this.data[address].push([key, value])
    return this.data
  }

  get(key) {
    const address = this._hash(key)
    const currentBucket = this.data[address]
    if (currentBucket) {
      for (let i = 0; i < currentBucket.length; i++) {
        if (currentBucket[i][0] === key) {
          return currentBucket[i][1]
        }
      }
    }
    return undefined
  }

  keys() {
    const keysArray = []
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        keysArray.push(this.data[i][0][0])
      }
    }
    return keysArray
  }
}
```

## 练习

```js
function findFirstRepeat(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return array[i]
      }
    }
  }
  return undefined
}
```

```js
// 利用空间降低时间复杂度
function findFirstRepeat(array) {
  const map = {}
  for (let i = 0; i < array.length; i++) {
    if (!map[array[i]]) {
      map[array[i]] = true
    } else {
      return array[i]
    }
  }
  return undefined
}
```

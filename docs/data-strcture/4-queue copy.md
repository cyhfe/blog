---
sidebar_position: 4
---

# stack & queue

## stack

栈： 后进先出

### array 实现 stack

```js
class Stack {
  constructor() {
    this.stack = []
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  push(value) {
    return this.stack.push(value)
  }

  pop() {
    return this.stack.pop()
  }
}
```

### linked-list 实现 stack

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.top = null
    this.bottom = null
    this.length = 0
  }
  peek() {
    return this.top
  }
  push(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.top = newNode
      this.bottom = newNode
    } else {
      newNode.next = this.top
      this.top = newNode
    }
    this.length++
  }
  pop() {
    if (!this.top) {
      return null
    }
    this.top = this.top.next
    this.length--
  }
}
```

## queue

队列：先进先出

### linked-list 实现 queue

```js
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Queue {
  constructor() {
    this.first = null
    this.last = null
    this.length = 0
  }

  peek() {
    return this.first
  }

  enqueue(value) {
    const newNode = new Node(value)
    if (this.length === 0) {
      this.first = newNode
      this.last = newNode
    } else {
      this.last.next = newNode
      this.last = newNode
    }
    this.length++
  }

  dequeue() {
    if (!this.first) return null
    this.first = this.first.next
    this.length--
  }
}
```

### 2 个 stack 实现 queue

可以想象有 2 根试管，互相倒水的过程

```js
class CrazyQueue {
  constructor() {
    this.first = []
    this.last = []
  }

  enqueue(value) {
    const length = this.first.length
    for (let i = 0; i < length; i++) {
      this.last.push(this.first.pop())
    }
    this.last.push(value)
    return this
  }

  dequeue() {
    const length = this.last.length
    for (let i = 0; i < length; i++) {
      this.first.push(this.last.pop())
    }
    this.first.pop()
    return this
  }
  peek() {
    if (this.last.length > 0) {
      return this.last[0]
    }
    return this.first[this.first.length - 1]
  }
}
```
